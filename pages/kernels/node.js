// @flow
import Layout from "../../components/layout/layout";
import Link from "next/link";
import {
  ContentSection,
  ContentSectionPane
} from "../../components/content-section/content-section";
import React from "react";
import Node from "../../components/kernels/node";
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../../components/page-header/page-header";

export default class NodePage extends React.Component {
  render() {
    let themeColor = "#2C1F39";

    return (
      <Layout pageTitle=": connect with nteract" themeColor={themeColor}>
        <PageHeader themeColor={themeColor}>
          <PageHeaderLeft>
            <h1>Kernels</h1>
            <p>
              Kernels connect your favorite languages to nteract projects for an
              improved REPL experience.
            </p>
            <div className="buttons">
              <Link href="/kernels/python">
                <a className="button button-secondary">Python</a>
              </Link>
              <Link href="/kernels/node">
                <a className="button button-secondary active">Node.js</a>
              </Link>
              <Link href="/kernels/r">
                <a className="button button-secondary">R</a>
              </Link>
            </div>
          </PageHeaderLeft>
          <PageHeaderRight>
            <img
              src="/static/kernels-terminal.png"
              alt="Hydrogen"
              className="cutoff-image"
            />
          </PageHeaderRight>
        </PageHeader>
        <Node />
      </Layout>
    );
  }
}
