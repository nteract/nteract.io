// @flow
import * as React from "react";
import { Hero } from "@components/hero";
import { colors } from "@common/colors";
import { Type, BashPre } from "@components/typography";
import { ContentSection, ContentSections } from "@components/content-section";
import { Button } from "@components/button";
import { Video } from "@components/video";
import { detectPlatform, getDownloadUrl } from "@lib";
import { DownloadFeaturette } from "@components/download-buttons";
import { CutoffImage } from "@components/cutoff-image";
import DemoVideo from "@components/demo-video";

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
              A universe of applications at your fingertips
            </Hero.Title>

            <Type.p>
              From authoring notebooks to creating quick code snippets to
              sharing notebooks with your team, nteract has a solution for you.
              Our suite of applications, built on top of the core SDK, allow you
              to author and publish notebooks in the cloud and on the desktop.
            </Type.p>
          </Hero.Pane>

          <Hero.Pane visual padding="40px 0 0 0">
            <DemoVideo />
          </Hero.Pane>
        </Hero>
        <ContentSections>
          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                The nteract Desktop App
              </ContentSection.Title>
              <Type.p>
                The nteract desktop application allows you to quickly view,
                edit, and publish notebooks from your desktop. It's
                cross-platform, so you can use it on your favorite operating
                system. The desktop application is a great tool for first-time
                and veteran notebook users, alike.
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img src="https://cloud.githubusercontent.com/assets/836375/18421299/d95ad398-783b-11e6-8b23-d54cf7caad1e.png" />
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>Hydrogen for Atom</ContentSection.Title>
              <Type.p>
                <a href="https://nteract.gitbooks.io/hydrogen/">Hydrogen</a> is
                an extension for the Atom code editor that allows you to run
                your code with an interactive REPL session with your language of
                choice. Get started with Hydrogen by installing it in your Atom
                editor.
                <BashPre
                  bgColor={colors.darkerGrayColor}
                  color={colors.lightCodeColor}
                >{`apm install hydrogen`}</BashPre>
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img src="https://cloud.githubusercontent.com/assets/13285808/20360886/7e03e524-ac03-11e6-9176-37677f226619.gif" />
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>commuter</ContentSection.Title>
              <Type.p>
                Have a lot of notebooks that you'd quickly like to preview and
                share with your team or the world. Deploy{" "}
                <a href="https://github.com/nteract/commuter">commuter</a>, a
                simple application for listing, viewing, and sharing Jupyter
                notebooks stored in Amazon S3, Google Cloud Storage, and more.
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img src="https://cloud.githubusercontent.com/assets/836375/23089382/e330effa-f53c-11e6-85d0-7561ccdbe163.gif" />
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>nteract play</ContentSection.Title>
              <Type.p>
                nteract is not just about notebooks! Interactive experiences of
                all sorts are powerful for users.{" "}
                <a href="https://play.nteract.io">nteract play</a> is a web app
                that allows you to execute code against a Binder instance.
                nteract play is built using the nteract core SDK and is a great
                showcase for how you can use the SDK to build unique
                nteract-based apps.
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane>
              <ContentSection.Title>
                The nteract Jupyter Extension
              </ContentSection.Title>
              <Type.p>
                Coming to nteract from Jupyter Notebook or JupyterLab? Try out
                the{" "}
                <a href="https://github.com/nteract/nteract/tree/master/applications/jupyter-extension">
                  nteract Jupyter extension
                </a>
                ! It runs in your Jupyter or JupyterHub server alongisde your
                other notebook UIs and allows you to work with notebooks in an
                nteract-style UI in a familiar environment.
              </Type.p>
            </ContentSection.Pane>
          </ContentSection>
        </ContentSections>
      </>
    );
  }
}

export default Atom;
