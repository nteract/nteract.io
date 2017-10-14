// @flow
import { GraphQLClient } from "graphql-request";
import { Component } from "react";

import Layout from "../components/layout/layout";
import {
  ContentSection,
  ContentSectionPane
} from "../components/content-section/content-section";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

type Member = {
  name: ?string,
  login: string,
  websiteUrl: ?string,
  avatarUrl: string,
  url: string
};

type Members = Array<Member>;

const Mission = () => (
  <ContentSection>
    <ContentSectionPane>
      <h3>Mission</h3>
      <p>
        Create fantastic interactive computing experiences that allow people to
        collaborate with each other with ease.
      </p>
    </ContentSectionPane>
  </ContentSection>
);

const Contributor = ({ person }: { person: Member }) => (
  <div className="person">
    <div className="person-avatar">
      <img src={person.avatarUrl} />
    </div>
    <div className="person-details">
      <div className="person-name">{person.name || "@" + person.login}</div>
    </div>
    <div className="person-social">
      <div className="social-item">
        <a href={person.url} target="_blank">
          <i className="mdi mdi-github-circle" />
        </a>
        {person.websiteUrl ? (
          <a href={person.websiteUrl} target="_blank">
            <i className="mdi mdi-web" />
          </a>
        ) : null}
      </div>
    </div>
  </div>
);

const Contributors = ({ members }: { members: ?Members }) => {
  if (!members || members.length === 0) return null;
  return (
    <ContentSection>
      <ContentSectionPane layout="center">
        <h3>Contributors</h3>
        <div className="grid">
          <div className="grid-wrapper">
            {members.map(person => (
              <Contributor person={person} key={person.login} />
            ))}
          </div>
        </div>
      </ContentSectionPane>
    </ContentSection>
  );
};

export default class AboutPage extends Component<void, OSProps, void> {
  static async getInitialProps() {
    const client = new GraphQLClient("https://api.github.com/graphql", {
      headers: {
        Authorization: "Bearer 243492ac50267b053ca0d23d73a59f9e46bee565"
      }
    });

    const query = `{
      organization(login: "nteract") {
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

    let members;
    try {
      const data = await client.request(query);
      members = data.organization.members.nodes;
      if (data.organization.members.totalCount > 100) {
        console.error(
          "100+ members in the organization. That's too much for one GraphQL call."
        );
      }
    } catch (e) {
      console.error(e);
    }

    return {
      members
    };
  }
  render() {
    let themeColor = "#334865";

    return (
      <Layout pageTitle=": We're people, not software!" themeColor={themeColor}>
        <PageHeader themeColor={themeColor}>
          <PageHeaderLeft>
            <h1>About nteract</h1>
            <p>{`We're people, not software!`}</p>
          </PageHeaderLeft>
        </PageHeader>
        <Mission />
        <Contributors members={this.props.members} />
      </Layout>
    );
  }
}
