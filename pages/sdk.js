// @flow
import * as React from "react";
import { Hero } from "@components/hero";
import { Type } from "@components/typography";
import { ContentSection, ContentSections } from "@components/content-section";
import { Button, Buttons } from "@components/button";
import { Video } from "@components/video";
import { detectPlatform, getDownloadUrl } from "@lib";
import { DownloadFeaturette } from "@components/download-buttons";
import { CutoffImage } from "@components/cutoff-image";

import type { Context } from "next";

class Atom extends React.Component<OSProps> {
  static async getInitialProps(ctx: Context): Promise<OSProps> {
    const platform = detectPlatform(ctx);
    const assetUrl = await getDownloadUrl(platform);
    return { platform, assetUrl };
  }

  render() {
    return (
      <>
        <Hero color="rgb(36, 77, 100)">
          <Hero.Pane padding="0 20px 0 0">
            <Hero.Title>
              Bringing the power of notebooks to every application
            </Hero.Title>

            <Type.p>
              The nteract core SDK is a set of React components and JavaScript
              packages that allow you to build your own interactive notebook
              applications. The nteract team uses the core SDK to build
              nteract's suite of applications. The same SDK is available for you
              to build your own interactive notebook apps. Read the core SDK
              docs to get started!
            </Type.p>
          </Hero.Pane>

          <Hero.Pane visual padding="40px 0 0 0"></Hero.Pane>
        </Hero>
        <ContentSections>
          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Composable and intuitive
              </ContentSection.Title>
              <Type.p>
                The nteract core SDK provides a set of components and packages
                that you can use to build your own notebook UI. These components
                and packages are composable, so you can swap them out with your
                implementations when needed or wrap them with your own
                functionality. Enjoy the freedom and think outside the box!
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane>
              <ContentSection.Title>
                Built on popular technologies
              </ContentSection.Title>
              <Type.p>
                The nteract core SDK is built on top of popular technologies
                like React, Redux, and RxJS. In addition to the functionality
                provided by the nteract core SDK, you can leverage the resources
                and extensions of these technologies in your nteract-based
                applications.
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane>
              <ContentSection.Title>
                Building notebooks for all
              </ContentSection.Title>
              <Type.p>
                The nteract core SDK is provided as part of our machine to
                provide notebook experiences for everyone. With this SDK, you
                can quickly integrate and iterate on a notebook UI for your
                application.
              </Type.p>
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Get started with the core SDK
              </ContentSection.Title>
              <Type.p>
                Hydrogen is an extension for the Atom code editor that allows
                you to run your code with an interactive REPL session with your
                language of choice. Get started with Hydrogen by installing it
                in your Atom editor.
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img src="https://cloud.githubusercontent.com/assets/13285808/20360886/7e03e524-ac03-11e6-9176-37677f226619.gif" />
            </ContentSection.Pane>
          </ContentSection>
        </ContentSections>
      </>
    );
  }
}

export default Atom;
