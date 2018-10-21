// @flow
import * as React from 'react';
import { GithubCircleIcon, WebIcon } from 'mdi-react';

import Layout from '../components/layout';
import {
  StyledPerson,
  StyledPersonAvatar,
  StyledPersonDetails,
  StyledPersonName,
  StyledPersonTitle,
  StyledPersonSocial,
  StyledPersonSocialItem,
  StyledGridWrapper,
  StyledGrid,
} from '../components/layout/styled';
import { ContentSection } from '../components/content-section';
import { PageHeader } from '../components/page-header';
import { Type } from '../components/typography';
const contributorsData = require('nteract-members');

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

const ContributorsList = contributorsData.map((person, index) => {
  if (!person.login) {
    return null;
  }
  return (
    <StyledPerson key={index}>
      <StyledPersonAvatar>
        <img src={person.avatar_url} />
      </StyledPersonAvatar>
      <StyledPersonDetails>
        <StyledPersonName>{person.name || '@' + person.login}</StyledPersonName>
      </StyledPersonDetails>
      <StyledPersonSocial>
        <StyledPersonSocialItem key={index}>
          <a href={person.html_url} target="_blank">
            <GithubCircleIcon />
          </a>
          {person.blog ? (
            <a href={person.blog} target="_blank">
              <WebIcon />
            </a>
          ) : null}
        </StyledPersonSocialItem>
      </StyledPersonSocial>
    </StyledPerson>
  );
});

const Contributors = () => (
  <ContentSection>
    <ContentSection.Pane center layout="center" full>
      <Type.h3>Contributors</Type.h3>
      <div className="grid">
        <StyledGridWrapper>{ContributorsList}</StyledGridWrapper>
      </div>
    </ContentSection.Pane>
  </ContentSection>
);

export default class AboutPage extends React.Component<OSProps, void> {
  render() {
    let themeColor = '#334865';
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
        <Contributors />
      </Layout>
    );
  }
}
