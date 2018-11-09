// @flow
import * as React from "react";
import { GithubCircleIcon, WebIcon } from "mdi-react";
import { GraphQLClient } from "graphql-request";

import Layout from "@components/layout";
import {
  StyledPerson,
  StyledPersonAvatar,
  StyledPersonDetails,
  StyledPersonName,
  StyledPersonTitle,
  StyledPersonSocial,
  StyledPersonSocialItem,
  StyledGridWrapper,
  StyledGrid
} from "@components/layout/styled";
import { ContentSection } from "@components/content-section";
import { PageHeader } from "@components/page-header";
import { Type } from "@components/typography";

type Member = {
  name: ?string,
  login: string,
  websiteUrl: ?string,
  avatarUrl: string,
  url: string
};

async function getMembers(organisation: string) {
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

const Mission = () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Type.h3>Mission</Type.h3>
      <Type.p>
        Create fantastic interactive computing experiences that allow people to
        collaborate with each other with ease.
      </Type.p>
    </ContentSection.Pane>
  </ContentSection>
);

const Contributor = ({ person }) => {
  if (!person.login) {
    return null;
  }
  return (
    <StyledPerson>
      <StyledPersonAvatar>
        <img src={person.avatarUrl} />
      </StyledPersonAvatar>
      <StyledPersonDetails>
        <StyledPersonName>{person.name || "@" + person.login}</StyledPersonName>
      </StyledPersonDetails>
      <StyledPersonSocial>
        <StyledPersonSocialItem>
          <a href={person.url} target="_blank">
            <GithubCircleIcon color="black" />
          </a>
          {person.websiteUrl ? (
            <a href={person.websiteUrl} target="_blank">
              <WebIcon color="black" />
            </a>
          ) : null}
        </StyledPersonSocialItem>
      </StyledPersonSocial>
    </StyledPerson>
  );
};

const Contributors = ({ members }: { members: Member[] }) => (
  <ContentSection>
    <ContentSection.Pane center layout="center" full>
      <Type.h3>Contributors</Type.h3>
      <div className="grid">
        <StyledGridWrapper>
          {members.map(member => (
            <Contributor person={member} key={member.login} />
          ))}
        </StyledGridWrapper>
      </div>
    </ContentSection.Pane>
  </ContentSection>
);

export default class AboutPage extends React.Component<
  { ...OSProps, members: Member[] },
  void
> {
  static async getInitialProps() {
    return { members: await getMembers("nteract") };
  }

  render() {
    let themeColor = "#334865";
    return (
      <Layout>
        <PageHeader themeColor={themeColor}>
          <PageHeader.Left>
            <PageHeader.Title>
              <>About nteract</>
            </PageHeader.Title>
            <p>{`We're people, not software!`}</p>
          </PageHeader.Left>
        </PageHeader>
        <Mission />
        <Contributors members={this.props.members} />
      </Layout>
    );
  }
}
