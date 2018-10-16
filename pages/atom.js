// @flow
import * as React from 'react';
import { colors } from 'common/constants'
import Layout from '@components/layout'
import { Hero } from '@components/hero';
import { Type, BashPre } from '@components/typography';
import { ContentSection, ContentSections } from '@components/content-section';
import { Button, Buttons } from '@components/button';
 
const Video = ({ mp4, webm, poster }) => (
  <video poster={poster} preload="auto" autoPlay muted loop="loop">
    {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    {webm ? <source src={webm} type="video/webm" /> : null}
  </video>
);

class Atom extends React.Component<null, null> {
  static async getInitialProps(ctx: *) {
    return {};
  }

  render() {
    return (
      <Layout>
        <Hero color="#232323">
          <Hero.Pane padding="0 20px 0 0">
            <Hero.Title>Hydrogen</Hero.Title>

            <Type.p>
              Run your code with an interactive REPL session with your language
              of choice inside GitHub’s Atom text editor.
            </Type.p>

            <Type.p>
              All the power of Jupyter kernels, inside your favorite text
              editor.
            </Type.p>

            <Type.h4 padding="20px 0 0 0">Install Hydrogen now with</Type.h4>
            <BashPre color="#232323">{`apm install hydrogen`}</BashPre>
          </Hero.Pane>

          <Hero.Pane visual padding="40px 0 0 0">
            <img src="/static/atom/featured.png" alt="Atom Hero Image" />
          </Hero.Pane>
        </Hero>
        <ContentSections>
          <ContentSection>
            <ContentSection.Pane>
              <ContentSection.Title>
                Interactive computing in Atom
              </ContentSection.Title>
              <Type.p>Choose which code to execute based on your needs.</Type.p>
              <Type.p>
                Run the whole file, a single line, a selection, or let Hydrogen
                decide which code to run based on the current cursor position.
              </Type.p>
            </ContentSection.Pane>

            <ContentSection.Pane visual>
              <Video
                mp4="/static/atom/interactive.mp4"
                poster="/static/atom/interactive.png"
              />
            </ContentSection.Pane>
          </ContentSection>

        </ContentSections>
      </Layout>
    );
  }
}

export default Atom;
