const { GraphQLClient } = require("graphql-request");

export async function fetchMembers(organisation) {
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
    organization(login: ${organisation}) {
      members(first: 100) {
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
    if (data.organization.members.totalCount > 100) {
      console.error(
        "100+ members in the organization. That's too much for one GraphQL call."
      );
    }
    return data.organization.members.nodes;
  } catch (e) {
    console.error(e);
    return [];
  }
}
