// @flow
import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import styled, { ServerStyleSheet, createGlobalStyle } from "styled-components";
import { normalize } from "polished";

import type { Context } from "next";
/**
 * Reset our styles
 */
const GlobalStyles = createGlobalStyle`
${normalize()};
*{
box-sizing: border-box;
}
html, body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
      Arial, sans-serif;
}
`;

const DocWrapper = styled.div`
  padding: 30px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 300;
  }
`;

type DocumentContext = Context & { renderPage: Function };

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          {this.props.styleTags}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <title>nteract</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
        </Head>
        <body>
          <Main />
          <GlobalStyles />
          <NextScript />
        </body>
      </html>
    );
  }
}
