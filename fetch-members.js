const fetch = require("isomorphic-fetch");
const { writeFileSync, existsSync, mkdirSync } = require("fs");

async function fetchMembers(organisation) {
  const url = `https://api.github.com/orgs/${organisation}/public_members`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'nteract-member-fetcher'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members = await response.json();
    
    return members.map(member => ({
      name: member.name || null,
      login: member.login,
      websiteUrl: member.blog || null,
      avatarUrl: member.avatar_url,
      url: member.html_url
    }));
  } catch (e) {
    console.error(`Error fetching members for ${organisation}:`, e);
    return [];
  }
}

async function main() {
  const members = await fetchMembers("nteract");
  if (!existsSync("generated")) mkdirSync("generated");
  writeFileSync("./generated/nteract-members.json", JSON.stringify(members));
}

main();
