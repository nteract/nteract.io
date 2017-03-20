// @flow
import Layout from "../components/layout/layout";
import ContentSection from "../components/content-section/content-section";
import React from "react";

import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

const DemoFeature = () => (
  <ContentSection>
    <div className="panes center-vertically">
      <div className="pane-30 pane">
        <h3>It's cool I guess</h3>
        <p>You should install it or something</p>
        <code>
          apm install hydrogen
        </code>
      </div>
      <div className="pane-70 pane">
        <div className="section-graphic">
          <img
            style={{
              boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)",
              transform: "translateX(50px)"
            }}
            src="https://cloud.githubusercontent.com/assets/13285808/20360886/7e03e524-ac03-11e6-9176-37677f226619.gif"
          />

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
              An Atom plugin to interact with Jupyter.
            </p>
            <code>apm install hydrogen</code>

            <div className="mobile-only hero-mobile-message">
              <h4>Connect with us</h4>
            </div>

          </PageHeaderLeft>
          <PageHeaderRight>
            <img
              src="https://cloud.githubusercontent.com/assets/13285808/20360886/7e03e524-ac03-11e6-9176-37677f226619.gif"
              alt=""
              className="cutoff-image"
            />
          </PageHeaderRight>
        </PageHeader>
        <DemoFeature />
        <DemoFeature />
      </Layout>
    );
  }
}
