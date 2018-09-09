// @flow
import * as React from "react";

import Layout from "../components/layout";
import {
  ContentSection
} from "../components/content-section";
import {
  PageHeader
} from "../components/page-header";

const contributorsData = require("nteract-members");

const Mission = () => (
  <ContentSection>
    <ContentSection.Pane>
      <h3>Mission</h3>
      <p>
        Create fantastic interactive computing experiences that allow people to
        collaborate with each other with ease.
      </p>
    </ContentSection.Pane>
  </ContentSection>
);

const ContributorsList = contributorsData.map((person, index) => {
  if (!person.login) {
    return null;
  }
  return (
    <div key={index} className="person">
      <div className="person-avatar">
        <img src={person.avatar_url} />
      </div>
      <div className="person-details">
        <div className="person-name">{person.name || "@" + person.login}</div>
      </div>
      <div className="person-social">
        <div key={index} className="social-item">
          <a href={person.html_url} target="_blank">
            <i className="mdi mdi-github-circle" />
          </a>
          {person.blog ? (
            <a href={person.blog} target="_blank">
              <i className="mdi mdi-web" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
});

const Contributors = () => (
  <ContentSection>
    <ContentSection.Pane layout="center">
      <h3>Contributors</h3>
      <div className="grid">
        <div className="grid-wrapper">{ContributorsList}</div>
      </div>
    </ContentSection.Pane>
  </ContentSection>
);

export default class AboutPage extends React.Component<OSProps, void> {
  render() {
    let themeColor = "#334865";

    return (
      <Layout pageTitle=": We're people, not software!" themeColor={themeColor}>
        <PageHeader themeColor={themeColor}>
          <PageHeader.Left>
            <h1>About nteract</h1>
            <p>{`We're people, not software!`}</p>
          </PageHeader.Left>
        </PageHeader>
        <Mission />
        <Contributors />
      </Layout>
    );
  }
}
