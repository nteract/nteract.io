// @flow
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../../components/page-header/page-header";
import SocialButtons from "../../components/navigation/social-buttons";

import { DownloadFeaturette } from "../../components/download-buttons";

export default () => (
  <PageHeader color="#334865">
    <PageHeaderLeft>
      <h1>Take your computing experience to the next level.</h1>
      <p>
        nteract is a desktop application that allows you to develop rich documents that contain prose,
        executable
        code (in almost any language!), and images. Whether you're a developer, data scientist,
        researcher, or journalist, nteract helps you
        write your next code-driven story.
      </p>
      <div className="mobile-only hero-mobile-message">
        <h4>Connect with us</h4>
        <SocialButtons />
      </div>

      <DownloadFeaturette platform="macOS" />

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
