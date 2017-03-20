// @flow
import Layout from "../components/layout/layout";
import ContentSection from "../components/content-section/content-section";
import React from "react";

import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../components/page-header/page-header";

const Mission = () => (
  <ContentSection>
    <div className="panes center-vertically">
      <div className="pane-30 pane">
        <h3>Mission</h3>
        <p>Be awesome</p>
      </div>
      <div className="pane-70 pane">
        <div className="section-graphic">
          <img
            style={{
              boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)",
              transform: "translateX(50px)"
            }}
            src="https://media.githubusercontent.com/media/nteract/logos/master/nteract_logo_cube_book/exports/animations/nteract_logo_wide_idle_animation.gif"
          />
        </div>
      </div>
    </div>
  </ContentSection>
);

const Community = Mission;
const Sponsorship = Mission;

export default class AboutPage extends React.Component<void, OSProps, void> {
  render() {
    return (
      <Layout pageTitle=": The nteract Desktop App">
        <PageHeader color="#1e0029">
          <PageHeaderLeft>
            <h1>
              About
            </h1>

            <p>
              Encourage collaboration with others.
            </p>

            <div className="mobile-only hero-mobile-message">
              <h4>Connect with us</h4>
            </div>

          </PageHeaderLeft>
          <PageHeaderRight>
            <style jsx>
              {
                `h1 {
              font-size: 7em;
            }`
              }
            </style>
            <h1>😎</h1>
          </PageHeaderRight>
        </PageHeader>
        <Mission />
        <Community />
        <Sponsorship />
      </Layout>
    );
  }
}
