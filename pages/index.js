// @flow
import React from "react";
import Layout from "../components/layout/layout";

import { ContentSection } from "../components/content-section/content-section";

import { detectPlatform, getDownloadUrl } from "../lib/os-detect";

import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

import SocialButtons from "../components/navigation/social-buttons";

import { DownloadFeaturette } from "../components/download-buttons";

const themeColor = "#334865";

const HomeHeader = (props: OSProps) => (
  <PageHeader themeColor={themeColor}>
    <PageHeaderLeft>
      <h1>
        nteract and create with <br />data, words, and visuals.
      </h1>
      <p>
        Fire up this desktop application and develop engaging documents with
        prose, executable code in a favorite language, pictures, and more.
      </p>
      <p>
        If you are a data scientist, researcher, journalist, educator, student,
        or developer, use nteract to write code-driven, interactive stories.
      </p>
      <div className="mobile-only hero-mobile-message">
        <h4>Connect with us</h4>
        <SocialButtons />
      </div>

      <DownloadFeaturette platform={props.platform} assetUrl={props.assetUrl} />
    </PageHeaderLeft>
    <PageHeaderRight>
      <img
        src="https://nteract.github.io/assets/images/nteract_app_demo@2x.png"
        alt="nteract demo"
        className="mobile-only video-placeholder"
      />
      <video
        className="not-mobile"
        poster="https://nteract.github.io/assets/images/nteract_app_demo@2x.png"
        preload="auto"
        loop="loop"
        autoPlay="true"
        muted="true"
      >
        <source
          src="https://nteract.github.io/assets/images/video/nteract_app_demo@2x.mp4"
          type="video/mp4"
        />
        <source
          src="https://nteract.github.io/assets/images/video/nteract_app_demo@2x.webm"
          type="video/webm"
        />
      </video>
    </PageHeaderRight>
  </PageHeader>
);

const Main = () => (
  <div>
    <ContentSection>
      <div className="panes center-vertically">
        <div className="pane-50 pane">
          <h3>Interactivity Where You Need It Most</h3>
          <p>
            nteract is a desktop-based computing environment, which means that
            the application can take advantage of all the goodies that your
            operating system provides, like file search and click to open.
            nteract and the desktop belong together.
          </p>
        </div>
        <div className="pane-50 pane">
          <div className="section-graphic">
            <img
              src="https://nteract.github.io/assets/images/feature_nteract_desktop@2x.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </ContentSection>

    <ContentSection>
      <div className="panes center-vertically">
        <div className="pane-50 pane">
          <div className="section-graphic">
            <img
              src="https://nteract.github.io/assets/images/feature_nteract_composable@2x.png"
              alt=""
            />
          </div>
        </div>
        <div className="pane-50 pane">
          <h3>Composability for All</h3>
          <p>
            nteract is built on top of a rich ecosystem of packages that allow
            developers to write software built on top of the notebook document
            format and the code execution protocol. You can visit our GitHub
            organization to find out which packages you can start to develop
            with.
          </p>
        </div>
      </div>
    </ContentSection>
    <ContentSection>
      <div className="panes center-vertically">
        <div className="pane-50 pane">
          <h3>Open to All</h3>
          <p>
            nteract is completely open-source and licensed under the BSD
            3-Clause License. We love getting pull requests and issues from our
            users, if you're interested in opening one check out our contributor
            documentation.
          </p>
        </div>
        <div className="pane-50 pane">
          <div className="section-graphic">
            <img
              src="https://nteract.github.io/assets/images/feature_nteract_open_to_all@2x.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </ContentSection>
  </div>
);

class Home extends React.Component<void, OSProps, void> {
  static async getInitialProps(ctx: Context<EmptyQuery>): Promise<OSProps> {
    const platform = detectPlatform(ctx);
    const assetUrl = await getDownloadUrl(platform);
    return { platform, assetUrl };
  }

  render() {
    return (
      <Layout themeColor={themeColor}>
        <HomeHeader
          platform={this.props.platform}
          assetUrl={this.props.assetUrl}
        />
        <Main />
      </Layout>
    );
  }
}

export default Home;
