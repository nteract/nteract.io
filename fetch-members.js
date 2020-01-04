const { GraphQLClient } = require("graphql-request");
const { writeFileSync, existsSync, mkdirSync } = require("fs");

async function fetchMembers(organisation) {
  const token = process.env.GH_TOKEN;

  if (!token) {
    console.error("'GH_TOKEN' not set. Could not fetch nteract members.");
    return [];
  }

  const client = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const query = `{
    organization(login: "${organisation}") {
      membersWithRole(first: 100) {
        totalCount
          nodes {
            name
            login
            websiteUrl
            avatarUrl
            url
          }
      }
    }
  }`;

  try {
    const data = await client.request(query);
    return data.organization.membersWithRole.nodes;
  } catch (e) {
    console.error(e);
    return [];
  }
}

async function main() {
  const members = await fetchMembers("nteract");
  if (!existsSync("generated")) mkdirSync("generated");
  writeFileSync("./generated/nteract-members.json", JSON.stringify(members));
}

main();
