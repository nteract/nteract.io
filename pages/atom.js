// @flow
import Layout from "../components/layout/layout";
import ContentSection from "../components/content-section/content-section";
import React from "react";

import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

const WatchExpressions = () => (
  <ContentSection>
    <div className="panes center-vertically">
      <div className="pane-30 pane">
        <h3>Watch Expressions</h3>
        <p>Get instant feedback on your written code every time you hit execute.</p>
      </div>
      <div className="pane-70 pane">
        <div className="section-graphic">
          <video
            style={{
              boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)",
              transform: "translateX(50px)"
            }}
            autoPlay
            loop
          >
            <source src="static/atom/watch-expressions.mp4" type="video/mp4" />
            <image src="static/atom/watch-expressions.png" alt="Watch Expressions" />
          </video>

        </div>
      </div>
    </div>
  </ContentSection>
);

const InteractiveCoding = () => (
  <ContentSection>
    <div className="panes center-vertically">
      <div className="pane-30 pane">
        <h3>Interactive computing in Atom</h3>
        <p>Choose which code to execute based on your needs.</p>
        <p>Run the whole file, a single line, a selection, or let Hydrogen decide which code to run based on the current cursor position.</p>
      </div>
      <div className="pane-70 pane">
        <div className="section-graphic">
          <video
            style={{
              boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)",
              transform: "translateX(50px)"
            }}
            autoPlay
            loop
          >
            <source src="static/atom/interactive.mp4" type="video/mp4" />
            <image src="static/atom/interactive.png" alt="Interactive coding" />
          </video>
        </div>
      </div>
    </div>
  </ContentSection>
);

export default class AtomPage extends React.Component {
  render() {
    return (
      <Layout pageTitle=": The nteract Desktop App">
        <PageHeader color="#333">
          <PageHeaderLeft>
            <h1>
              Hydrogen
            </h1>

            <p>
            Run your code with an interactive REPL session with your language of choice inside GitHub’s <a href="https://atom.io/">Atom</a> text editor.
            </p>
            <p>All the power of Jupyter kernels, inside your favorite text editor.</p>
            <p>Install Hydrogen now with:</p>
            <code>apm install hydrogen</code>

            <div className="mobile-only hero-mobile-message">
              <h4>Connect with us</h4>
            </div>

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
      </Layout>
    );
  }
}
