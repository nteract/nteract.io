// @flow
import Layout from "../components/layout/layout";
import { ContentSection } from "../components/content-section/content-section";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/styles";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

const installCode = `apm install hydrogen`;

const InteractiveCoding = () => (
  <ContentSection>
    <div className="panes center-vertically">
      <div className="pane-50 pane">
        <div className="section-graphic">
          <video
            style={{ boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)" }}
            autoPlay
            loop
          >
            <source src="static/atom/interactive.mp4" type="video/mp4" />
            <image src="static/atom/interactive.png" alt="Interactive coding" />
          </video>
        </div>
      </div>
      <div className="pane-50 pane">
        <h3>Interactive computing in Atom</h3>
        <p>Choose which code to execute based on your needs.</p>
        <p>
          Run the whole file, a single line, a selection, or let Hydrogen decide
          which code to run based on the current cursor position.
        </p>
      </div>
    </div>
  </ContentSection>
);

const WatchExpressions = () => (
  <ContentSection>
    <div className="panes center-vertically">
      <div className="pane-50 pane">
        <h3>Watch Expressions</h3>
        <p>
          Get instant feedback on your written code every time you hit execute.
        </p>
      </div>
      <div className="pane-50 pane">
        <div className="section-graphic">
          <video
            style={{ boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)" }}
            autoPlay
            loop
          >
            <source src="static/atom/watch-expressions.mp4" type="video/mp4" />
            <image
              src="static/atom/watch-expressions.png"
              alt="Watch Expressions"
            />
          </video>
        </div>
      </div>
    </div>
  </ContentSection>
);

const InspectCode = () => (
  <ContentSection>
    <div className="panes center-vertically">
      <div className="pane-50 pane">
        <div className="section-graphic">
          <video
            style={{ boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)" }}
            autoPlay
            loop
          >
            <source src="static/atom/inspect.mp4" type="video/mp4" />
            <image src="static/atom/inspect.png" alt="Code Completion" />
          </video>
        </div>
      </div>
      <div className="pane-50 pane">
        <h3>Code Completion and Documentation</h3>
        <p>
          Code completion and a inspector for displaying metadata, like
          documentation, are there to make your coding experience seamless.
        </p>
        <p>
          There’s no need to leave your favorite text editor to get the
          information you need to fuel your development process.
        </p>
      </div>
    </div>
  </ContentSection>
);

export default class AtomPage extends React.Component {
  render() {
    let themeColor = "#232323";

    const h4Styles = {
      color: "rgba(255,255,255,0.8)",
      marginBottom: "0"
    };

    return (
      <Layout pageTitle=": Hydrogen for Atom" themeColor={themeColor}>
        <PageHeader themeColor={themeColor}>
          <PageHeaderLeft>
            <h1>Hydrogen</h1>

            <p>
              Run your code with an interactive REPL session with your language
              of choice inside GitHub’s <a href="https://atom.io/">Atom</a> text
              editor.
            </p>
            <p>
              All the power of Jupyter kernels, inside your favorite text
              editor.
            </p>
            <h4 style={h4Styles}>Install Hydrogen now with</h4>
            <SyntaxHighlighter language="zsh" style={darcula}>
              {installCode}
            </SyntaxHighlighter>
          </PageHeaderLeft>
          <PageHeaderRight>
            <img
              src="static/atom/featured.png"
              alt="Hydrogen"
              className="cutoff-image"
            />
          </PageHeaderRight>
        </PageHeader>
        <InteractiveCoding />
        <WatchExpressions />
        <InspectCode />
      </Layout>
    );
  }
}
