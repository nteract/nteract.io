// @flow
import * as React from 'react';
import { colors } from '@common/colors'
import Layout from '@components/layout'
import { Hero } from '@components/hero';
import { Type, BashPre } from '@components/typography';
import { ContentSection, ContentSections } from '@components/content-section';
import { Button, Buttons } from '@components/button';
import { CutoffImage } from '@components/cutoff-image';

const Video = ({ mp4, webm, poster }) => (
  <video poster={poster} preload="auto" autoPlay muted loop="loop">
    {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    {webm ? <source src={webm} type="video/webm" /> : null}
  </video>
);

const InspectCode = () => (
  <ContentSection center>
      <ContentSection.Pane visual>
          <Video
            style={{ boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)" }}
            mp4="static/atom/inspect.mp4"
            poster="static/atom/inspect.png"
            alt="Demo of code completion using atom, hydrogen and python"
          />
      </ContentSection.Pane>

      <ContentSection.Pane>
        <ContentSection.Title>Code Completion and Documentation</ContentSection.Title>
        <Type.p>
          Code completion and an inspector for displaying metadata, like
          documentation, are there to make your coding experience seamless.
        </Type.p>
        <Type.p>
          There’s no need to leave your favorite text editor to get the
          information you need to fuel your development process.
        </Type.p>
      </ContentSection.Pane>
  </ContentSection>)
const InteractiveComputing = () => (
          <ContentSection>
            <ContentSection.Pane visual>
              <Video
                mp4="/static/atom/interactive.mp4"
                poster="/static/atom/interactive.png"
                alt="Demo of interactive computing using atom, hydrogen, and python"
              />
            </ContentSection.Pane>
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
          </ContentSection>
)
const WatchExpressions = () => (
  <ContentSection center>
      <ContentSection.Pane>
        <ContentSection.Title>Watch Expressions</ContentSection.Title>
        <Type.p>
          Get instant feedback on your written code every time you hit execute.
        </Type.p>
      </ContentSection.Pane>
      <ContentSection.Pane visual>
          <Video
            style={{ boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)" }}
            mp4="static/atom/watch-expressions.mp4"
            poster="static/atom/watch-expressions.png"
            alt="Demo of watching expressions using hydrogen in atom."
          />
      </ContentSection.Pane>
  </ContentSection>)

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

            <Type.h4 style={{color: 'rgba(255,255,255, 0.8)'}} padding="20px 0 0 0">Install Hydrogen now with</Type.h4>
            <BashPre bgColor={colors.darkerGrayColor} color={colors.lightCodeColor}>{`apm install hydrogen`}</BashPre>
          </Hero.Pane>

          <Hero.Pane visual padding="40px 0 0 0">
            <CutoffImage src="/static/atom/featured.png" alt="Atom Hero Image" />
          </Hero.Pane>
        </Hero>
        <ContentSections>
          <InteractiveComputing />
          <WatchExpressions />
          <InspectCode />
        </ContentSections>
      </Layout>
    );
  }
}

export default Atom;
