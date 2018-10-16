// @flow
import * as React from "react";
import Head from "next/head";
import LanguageToggle from "../kernels/language-toggle";

import Layout from "../layout/layout";
import { ContentSection } from "../content-section";
import PageHeader from "./page-header";

export type KernelPageProps = {
  language: string,
  Kernel: any
};

export const kernels = [
  { name: "python", path: "/kernels/python" },
  { name: "r", path: "/kernels/r" },
  { name: "node.js", path: "/kernels/node" },
  { name: "julia", path: "/kernels/julia" },
  { name: "c++", path: "/kernels/c++" },
];

export default (props: KernelPageProps, themeColor: "#444") => (
  <Layout pageTitle={`: kernels - ${props.language}`} themeColor={themeColor}>
    <Head>
      <link rel="stylesheet" href="/static/kernels.css" />
    </Head>
    <PageHeader themeColor={themeColor} />
    <ContentSection>
      <header>
        <LanguageToggle current={props.language} kernels={kernels} />
      </header>
      <props.Kernel />
    </ContentSection>
  </Layout>
);
