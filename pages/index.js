// @flow
import * as React from 'react';
import Layout from '@components/layout';
import { Hero } from '@components/hero';
import { Type } from '@components/typography';
import { ContentSections, ContentSection } from '@components/content-section';
import { Button, Buttons } from '@components/button';
import { DownloadFeaturette } from '@components/download-buttons';
import { detectPlatform, getDownloadUrl } from '@lib';

const DemoVideo = () => (
  <video
    poster="https://nteract.github.io/assets/images/nteract_app_demo@2x.png"
    preload="auto"
    autoPlay
    muted
    loop="loop"
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
);

type HomeProps = { 
  platform: Platforms,
  assetUrl: string,
}

class Home extends React.Component<HomeProps, null> {
  
  static async getInitialProps(ctx: Context<EmptyQuery>): Promise<OSProps> {
    const platform = detectPlatform(ctx);
    const assetUrl = await getDownloadUrl(platform);
    return { platform, assetUrl };
  }

  render() {
    return (
      <Layout >
        <Hero>
          <Hero.Pane padding="0 20px 0 0">
            <Hero.Title>
              <>nteract and create with data, words, and visuals.</>
            </Hero.Title>

            <Type.p>
              Fire up this desktop application and develop engaging documents
              with prose, executable code in a favorite language, pictures, and
              more.
            </Type.p>
            <Type.p>
              If you are a data scientist, researcher, journalist, educator,
              student, or developer, use nteract to write code-driven,
              interactive stories.
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
                Interactivity Where You Need It Most
              </ContentSection.Title>
              <Type.p>
                nteract is a desktop-based computing environment, which means
                that the application can take advantage of all the goodies that
                your operating system provides, like file search and click to
                open. nteract and the desktop belong together.
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img
                src="https://nteract.github.io/assets/images/feature_nteract_desktop@2x.png"
                alt="interactivity"
              />
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>Composability for All</ContentSection.Title>
              <Type.p>
                nteract is built on top of a rich ecosystem of packages that
                allow developers to write software built on top of the notebook
                document format and the code execution protocol. You can visit
                our GitHub organization to find out which packages you can start
                to develop with.
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <img
                src="https://nteract.github.io/assets/images/feature_nteract_composable@2x.png"
                alt="Composability"
              />
            </ContentSection.Pane>
          </ContentSection>

          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>Open to All</ContentSection.Title>
              <Type.p>
                nteract is completely open-source and licensed under the BSD
                3-Clause License. We love getting pull requests and issues from
                our users, if you're interested in opening one check out our
                contributor documentation.
              </Type.p>
            </ContentSection.Pane>
            <ContentSection.Pane visual>
              <img
                src="https://nteract.github.io/assets/images/feature_nteract_open_to_all@2x.png"
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
