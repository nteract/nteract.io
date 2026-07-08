#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

import yaml from "js-yaml";

const API_ROOT = "https://api.github.com";
const CHANGELOG_DIRECTORY = path.join(process.cwd(), "content/changelog");

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(value, field, filePath) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `Expected technicalChangelog.${field} to be a non-empty string in ${filePath}`,
    );
  }

  return value.trim();
}

function lineNumberAt(source, offset) {
  return source.slice(0, offset).split(/\r?\n/).length;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function parseFrontmatter(source) {
  const frontmatterMatch = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);

  if (!frontmatterMatch) {
    return { data: {}, content: source, contentOffset: 0 };
  }

  const data = yaml.load(frontmatterMatch[1]);

  return {
    data: isRecord(data) ? data : {},
    content: source.slice(frontmatterMatch[0].length),
    contentOffset: frontmatterMatch[0].length,
  };
}

export function getTechnicalChangelogConfig(data, filePath) {
  const value = data.technicalChangelog;

  if (value == null) {
    return null;
  }

  if (!isRecord(value)) {
    throw new Error(
      `Expected technicalChangelog to be an object in ${filePath}`,
    );
  }

  const repo = requireString(value.repo, "repo", filePath);
  const baseTag = requireString(value.baseTag, "baseTag", filePath);
  const releaseTag = requireString(value.releaseTag, "releaseTag", filePath);

  if (!/^[^/\s]+\/[^/\s]+$/.test(repo)) {
    throw new Error(
      `Expected technicalChangelog.repo to look like "owner/name" in ${filePath}`,
    );
  }

  return { repo, baseTag, releaseTag };
}

export function extractDetailsBlocks(content) {
  const blocks = [];
  const detailsPattern = /<details\b[^>]*>([\s\S]*?)<\/details>/gi;
  let match;

  while ((match = detailsPattern.exec(content)) != null) {
    const contentStartIndex = match.index + match[0].indexOf(match[1]);
    blocks.push({
      content: match[1],
      startIndex: contentStartIndex,
    });
  }

  return blocks;
}

export function extractTechnicalChangelogLinks(
  content,
  repo,
  source = content,
  contentOffset = 0,
) {
  const links = [];
  const repoPattern = escapeRegExp(repo);
  const linkPattern = new RegExp(
    `https://github\\.com/${repoPattern}/(commit|pull)/([^\\s)>'"]+)`,
    "gi",
  );

  for (const block of extractDetailsBlocks(content)) {
    let match;
    while ((match = linkPattern.exec(block.content)) != null) {
      const target = match[2].replace(/[.,;:]+$/, "");
      const kind = match[1].toLowerCase();

      if (kind === "commit" && !/^[0-9a-f]{7,40}$/i.test(target)) {
        continue;
      }

      if (kind === "pull" && !/^\d+$/.test(target)) {
        continue;
      }

      const offset = contentOffset + block.startIndex + match.index;
      links.push({
        kind,
        target,
        url: match[0],
        line: lineNumberAt(source, offset),
      });
    }
  }

  return links;
}

export function parseCompareLinkHeader(header) {
  const links = {};

  if (!header) {
    return links;
  }

  for (const part of header.split(",")) {
    const match = /<([^>]+)>;\s*rel="([^"]+)"/.exec(part.trim());
    if (match) {
      links[match[2]] = match[1];
    }
  }

  return links;
}

export function resolveCommitInRange(target, rangeShas) {
  const normalized = target.toLowerCase();
  const matches = rangeShas.filter((sha) =>
    sha.toLowerCase().startsWith(normalized),
  );

  if (matches.length === 1) {
    return { status: "in-range", sha: matches[0] };
  }

  if (matches.length > 1) {
    return { status: "ambiguous", matches };
  }

  return { status: "out-of-range" };
}

function uniqueLinks(links) {
  return [
    ...new Map(
      links.map((link) => [`${link.kind}:${link.target}`, link]),
    ).values(),
  ];
}

async function githubJson(urlOrPath, token, options = {}) {
  const url = urlOrPath.startsWith("http")
    ? urlOrPath
    : `${API_ROOT}/${urlOrPath.replace(/^\/+/, "")}`;
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "nteract.io-changelog-validator",
    "x-github-api-version": "2022-11-28",
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (response.status === 404 && options.allowNotFound) {
    return { data: null, headers: response.headers };
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `GitHub API request failed (${response.status}) for ${url}: ${body}`,
    );
  }

  return { data: await response.json(), headers: response.headers };
}

async function fetchCompareRange(config, token) {
  const { repo, baseTag, releaseTag } = config;
  let nextUrl = `${API_ROOT}/repos/${repo}/compare/${encodeURIComponent(
    baseTag,
  )}...${encodeURIComponent(releaseTag)}?per_page=100`;
  const shas = [];
  let totalCommits;

  while (nextUrl) {
    const { data, headers } = await githubJson(nextUrl, token);

    if (!Array.isArray(data.commits)) {
      throw new Error(
        `GitHub compare response for ${repo} ${baseTag}...${releaseTag} did not include commits`,
      );
    }

    totalCommits ??= data.total_commits;
    shas.push(...data.commits.map((commit) => commit.sha));
    nextUrl = parseCompareLinkHeader(headers.get("link")).next;
  }

  if (typeof totalCommits === "number" && shas.length !== totalCommits) {
    throw new Error(
      `GitHub compare response for ${repo} ${baseTag}...${releaseTag} returned ${shas.length} of ${totalCommits} commits`,
    );
  }

  return { shas, totalCommits: totalCommits ?? shas.length };
}

async function fetchPull(repo, number, token) {
  const { data } = await githubJson(`repos/${repo}/pulls/${number}`, token, {
    allowNotFound: true,
  });
  return data;
}

async function fetchCommit(repo, sha, token) {
  const { data } = await githubJson(`repos/${repo}/commits/${sha}`, token, {
    allowNotFound: true,
  });
  return data;
}

async function validateCommitLink({ repo, link, rangeShas, token }) {
  const resolved = resolveCommitInRange(link.target, rangeShas);

  if (resolved.status === "in-range") {
    return [];
  }

  if (resolved.status === "ambiguous") {
    return [
      {
        line: link.line,
        message: `commit ${link.target} is ambiguous within ${repo}: ${resolved.matches.join(
          ", ",
        )}`,
      },
    ];
  }

  const commit = await fetchCommit(repo, link.target, token);

  if (!commit) {
    return [
      {
        line: link.line,
        message: `commit ${link.target} does not exist in ${repo}`,
      },
    ];
  }

  return [
    {
      line: link.line,
      message:
        `commit ${link.target} exists as ${commit.sha} ` +
        "but is outside the configured range",
    },
  ];
}

async function validatePullLink({ repo, link, rangeShas, token }) {
  const pull = await fetchPull(repo, link.target, token);

  if (!pull) {
    return [
      {
        line: link.line,
        message: `pull #${link.target} does not exist in ${repo}`,
      },
    ];
  }

  if (!pull.merged_at || typeof pull.merge_commit_sha !== "string") {
    return [
      {
        line: link.line,
        message: `pull #${link.target} is not merged`,
      },
    ];
  }

  const resolved = resolveCommitInRange(pull.merge_commit_sha, rangeShas);

  if (resolved.status === "in-range") {
    return [];
  }

  return [
    {
      line: link.line,
      message:
        `pull #${link.target} merged as ${pull.merge_commit_sha} ` +
        "but is outside the configured range",
    },
  ];
}

async function validateLink({ repo, link, rangeShas, token }) {
  if (link.kind === "commit") {
    return validateCommitLink({ repo, link, rangeShas, token });
  }

  return validatePullLink({ repo, link, rangeShas, token });
}

async function configuredChangelogFiles() {
  const dirEntries = await fs.readdir(CHANGELOG_DIRECTORY, {
    withFileTypes: true,
  });
  const files = [];

  for (const entry of dirEntries) {
    if (
      !entry.isFile() ||
      !/\.mdx?$/.test(entry.name) ||
      entry.name.startsWith("_")
    ) {
      continue;
    }

    const filePath = path.join(CHANGELOG_DIRECTORY, entry.name);
    const source = await fs.readFile(filePath, "utf8");
    const parsed = parseFrontmatter(source);
    const config = getTechnicalChangelogConfig(parsed.data, filePath);

    if (config) {
      files.push({ filePath, source, parsed, config });
    }
  }

  return files;
}

async function main() {
  const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || "";
  const files = await configuredChangelogFiles();
  const compareCache = new Map();
  const failures = [];
  const reports = [];

  if (files.length === 0) {
    throw new Error("No changelog entries define technicalChangelog metadata");
  }

  for (const file of files) {
    const links = extractTechnicalChangelogLinks(
      file.parsed.content,
      file.config.repo,
      file.source,
      file.parsed.contentOffset,
    );

    if (extractDetailsBlocks(file.parsed.content).length === 0) {
      failures.push({
        filePath: file.filePath,
        line: null,
        message: "configured entry does not contain a <details> block",
      });
      continue;
    }

    if (links.length === 0) {
      failures.push({
        filePath: file.filePath,
        line: null,
        message: "configured entry does not contain commit or PR links",
      });
      continue;
    }

    const cacheKey = `${file.config.repo}:${file.config.baseTag}:${file.config.releaseTag}`;
    let compare = compareCache.get(cacheKey);

    if (!compare) {
      compare = await fetchCompareRange(file.config, token);
      compareCache.set(cacheKey, compare);
    }

    for (const link of uniqueLinks(links)) {
      const linkFailures = await validateLink({
        repo: file.config.repo,
        link,
        rangeShas: compare.shas,
        token,
      });
      failures.push(
        ...linkFailures.map((failure) => ({
          filePath: file.filePath,
          ...failure,
        })),
      );
    }

    reports.push({
      filePath: file.filePath,
      linkCount: links.length,
      uniqueLinkCount: uniqueLinks(links).length,
      commitCount: compare.totalCommits,
      config: file.config,
    });
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      const location =
        failure.line == null
          ? failure.filePath
          : `${failure.filePath}:${failure.line}`;
      console.error(`${location} - ${failure.message}`);
    }
    process.exitCode = 1;
    return;
  }

  for (const report of reports) {
    console.log(
      `Validated ${report.uniqueLinkCount} technical changelog links in ` +
        `${report.filePath} against ${report.config.repo} ` +
        `${report.config.baseTag}...${report.config.releaseTag} ` +
        `(${report.commitCount} commits).`,
    );
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
