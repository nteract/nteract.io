// @flow
import * as React from "react";
import { Hero } from "@components/hero";
import { Type } from "@components/typography";
import { ContentSection, ContentSections } from "@components/content-section";
import { Header } from "@components/header";
import { Video } from "@components/video";
import { detectPlatform, getDownloadUrl } from "@lib";
import DemoVideo from "@components/demo-video";
import styled, { css } from "styled-components";

import type { Context } from "next";

const FortyPXHero = styled.div`
  height: 40px;
  overflow: hidden;
  width: 100%;
`;

class SDK extends React.Component<OSProps> {
  render() {
    return (
      <>
        <Hero color="#232323">
          <Hero.Pane padding="0 20px 0 0">
            <Hero.Title>
              Bringing the power of notebooks to every application
            </Hero.Title>

            <Type.p>
              The nteract core SDK is a set of React components and JavaScript
              packages that allow you to build your own interactive notebook
              applications. The nteract team uses the core SDK to build
              nteract's suite of applications. The same SDK is available for you
              to build your own interactive notebook apps.
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
                Get started with the core SDK
              </ContentSection.Title>
              <Type.p>
                To get started building nteract-based apps with our SDK, please
                visit{" "}
                <a href="https://docs.nteract.io/" target="_blank">
                  our documentation
                </a>
                .
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane visual>
              <Video mp4="https://github.com/nteract/logos/raw/master/nteract_logo_cube_book/exports/animations/nteract_logo_wide_idle_animation.mp4" />
            </ContentSection.Pane>
          </ContentSection>
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
                Built on dependable technologies
              </ContentSection.Title>
              <Type.p>
                The nteract core SDK is built on top of popular and dependable
                technologies like React, Redux, and RxJS. In addition to the
                functionality provided by the nteract core SDK, you can leverage
                the resources and extensions of these technologies in your
                nteract-based applications.
              </Type.p>
            </ContentSection.Pane>
          </ContentSection>
          <FortyPXHero>
            <Hero color="#232323" />
          </FortyPXHero>
          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Data Explorer
              </ContentSection.Title>
              <Type.p>
                A GUI-driven way to visualize your dataframes (and dataframe-like data) using a variety of charting methods that can also be deployed as a stand-alone module. See the {" "}
                <a href="https://data-explorer.nteract.io/" target="_blank">
                  documentation here
                </a>
                .
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane visual>
              <img src="https://user-images.githubusercontent.com/1863892/55675008-07632e80-5871-11e9-9dac-0a71450faf7b.gif" />            </ContentSection.Pane>
          </ContentSection>
          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Semiotic
              </ContentSection.Title>
              <Type.p>
                A React-based data visualization library with rich annotations, network visualization, summary charts, interactivity and more.
                <a href="https://semiotic.nteract.io/" target="_blank">
                  Check out the interactive documentation.
                </a> (It also has bar charts and lines charts)
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane visual>
              <img src="https://github.com/nteract/semiotic/raw/master/semiotic_logo_horizontal.png" />
            </ContentSection.Pane>
          </ContentSection>

        </ContentSections>
      </>
    );
  }
}

export default SDK;
