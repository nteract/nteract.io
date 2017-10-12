// @flow
import Layout from "../components/layout/layout";
import {
  ContentSection,
  ContentSectionPane
} from "../components/content-section/content-section";
import React from "react";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

const contributorsData = require("nteract-members");

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
    <ContentSectionPane layout="center">
      <h3>Contributors</h3>
      <div className="grid">
        <div className="grid-wrapper">{ContributorsList}</div>
      </div>
    </ContentSectionPane>
  </ContentSection>
);

export default class AboutPage extends React.Component<void, OSProps, void> {
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
        <Contributors />
      </Layout>
    );
  }
}
