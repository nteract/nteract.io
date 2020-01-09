// @flow
import * as React from "react";
import Layout from "@components/layout";
import { Hero } from "@components/hero";
import { Type } from "@components/typography";
import { ContentSections, ContentSection } from "@components/content-section";
import { Button, Buttons } from "@components/button";
import { DownloadFeaturette } from "@components/download-buttons";
import { detectPlatform, getDownloadUrl } from "@lib";
import DemoVideo from "@components/demo-video";

import type { Context } from "next";

class Home extends React.Component<OSProps, null> {
  static async getInitialProps(ctx: Context): Promise<OSProps> {
    const platform = detectPlatform(ctx);
    const assetUrl = await getDownloadUrl(platform);
    return { platform, assetUrl };
  }

  render() {
    return (
      <Layout>
        <Hero>
          <Hero.Pane padding="0 20px 0 0">
            <Hero.Title>
              <>nteract: building the future of interactive computing.</>
            </Hero.Title>

            <Type.p>
              nteract is an open-source organization committed to creating
              fantastic interactive computing experiences that allow people to
              collaborate with ease.
            </Type.p>
            <Type.p>
              We build SDKs, applications, and libraries that help you and your
              team make the most of interactive notebooks and REPLs.
            </Type.p>
            <Type.p>
              To dive into the nteract ecosystem, start by trying out our
              desktop application for interactive notebooks.
            </Type.p>

            {/* Call to Action */}
            <DownloadFeaturette
              platform={this.props.platform}
              assetUrl={this.props.assetUrl}
            />
          </Hero.Pane>

          <Hero.Pane visual padding="40px 0 0 0">
            <DemoVideo />
          </Hero.Pane>
        </Hero>
        <ContentSections>
          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Enhance your productivity with nteract's app suite
              </ContentSection.Title>
              <Type.p>
                The nteract ecosystem provides a wide variety of notebook-based
                applications for your scenario. Whether you want to edit
                notebooks in a desktop app or in your favorite editor, nteract
                provides you the tools you need to leverage the full power of
                interactive notebooks.
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img
                src="/static/feature_nteract_desktop.svg"
                alt="interactivity"
              />
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Build your own interactive notebook apps
              </ContentSection.Title>
              <Type.p>
                Interactive notebooks and REPLs are a powerful way for people to
                interact with machines. nteract provides a client-side SDK for
                integrating notebook and REPL UIs into your software. The same
                SDK used to build the nteract suite of applications is available
                to you!
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img
                src="/static/feature_nteract_composable.svg"
                alt="Composability"
              />
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Create end-to-end workflows with notebooks
              </ContentSection.Title>
              <Type.p>
                There's more to notebooks that writing them! The nteract
                ecosytem provides a set of libraries for headlessly executing
                notebooks, managing your team's notebooks, using notebooks for
                reporting and more. Use these tools to build an end-to-end
                notebook experience for you and your team.
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane visual>
              <img
                src="/static/feature_nteract_open_to_all.svg"
                alt="Composability"
              />
            </ContentSection.Pane>
          </ContentSection>
        </ContentSections>
      </Layout>
    );
  }
}

export default Home;
