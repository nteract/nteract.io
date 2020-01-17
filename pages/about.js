// @flow
import * as React from "react";
import { GithubCircleIcon, WebIcon } from "mdi-react";
const NTERACT_MEMBERS = require("../generated/nteract-members.json");

import Layout from "@components/layout";
import {
  StyledPerson,
  StyledPersonAvatar,
  StyledPersonDetails,
  StyledPersonName,
  StyledPersonTitle,
  StyledPersonSocial,
  StyledPersonSocialItem,
  StyledGridWrapper
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

const Mission = () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Type.h3>Mission</Type.h3>
      <Type.p>
        The nteract open source organization is committed to building the future
        of interactive computing. We are committed to:
      </Type.p>
      <Type.p>
        <ul>
          <li>
            Creating fantastic interactive computing experiences that allow
            people to collaborate with ease.
          </li>
          <li>
            Emphasizing simplicity and composability as core design principles
            to provide users ideal building blocks for their unique data
            applications.
          </li>
          <li>
            Valuing our contributors and users and cooperating to produce
            solutions that delight others.
          </li>
        </ul>
      </Type.p>
      <Type.p>
        Software is not possible without people. Thank you to all the
        contributors who have helped build the nteract open source ecosystem.
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

export default class AboutPage extends React.Component<OSProps, void> {
  render() {
    let themeColor = "#334865";
    return (
      <Layout>
        <PageHeader themeColor={themeColor}>
          <PageHeader.Left>
            <PageHeader.Title>
              <>About the nteract open source organization</>
            </PageHeader.Title>
          </PageHeader.Left>
        </PageHeader>
        <Mission />
        <Contributors members={NTERACT_MEMBERS} />
      </Layout>
    );
  }
}
