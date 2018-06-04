// @flow
import React from 'react';
import { Hero } from '@components/hero';
import { Type } from '@components/typography';
import { ContentSections, ContentSection } from '@components/content-section';

const videoProps = {
  poster: 'https://nteract.github.io/assets/images/nteract_app_demo@2x.png',
  preload: 'auto',
  autoPlay: true,
  muted: true,
  loop: 'loop',
  sources: [
    {
      src:
        'https://nteract.github.io/assets/images/video/nteract_app_demo@2x.mp4',
      type: 'video/mp4',
    },
    {
      src:
        'https://nteract.github.io/assets/images/video/nteract_app_demo@2x.webm',
      type: 'video/webm',
    },
  ],
};

const Video = ({ sources, ...rest }) => (
  <video {...rest}>
    {sources.map((source, i) => <source {...source} key={i} />)}
  </video>
);

class Home extends React.Component<null, null> {
  static async getInitialProps(ctx: *) {
    return {};
  }

  render() {
    return (
      <>
        <Hero
          content={{
            panes: [
              {
                title: {
                  children: (
                    <>nteract and create with data, words, and visuals.</>
                  ),
                },
                padding: '0 20px 0 0',
                children: (
                  <>
                    <Type.p>
                      Fire up this desktop application and develop engaging
                      documents with prose, executable code in a favorite
                      language, pictures, and more.
                    </Type.p>
                    <Type.p>
                      If you are a data scientist, researcher, journalist,
                      educator, student, or developer, use nteract to write
                      code-driven, interactive stories.
                    </Type.p>
                  </>
                ),
                actions: {
                  padding: '20px 0 0 0',
                  items: [
                    {
                      primary: true,
                      label: 'Download for macOS (alpha)',
                      icon:
                        'https://nteract.github.io/assets/images/icon-nteract-download.svg',
                    },
                  ],
                  message: (
                    <Type.p small padding="10px 0 0 0">
                      Download for other platforms
                    </Type.p>
                  ),
                },
              },
              {
                padding: '40px 0 0 0',
                visual: true,
                children: <Video {...videoProps} />,
              },
            ],
          }}
        />
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
      </>
    );
  }
}

export default Home;
