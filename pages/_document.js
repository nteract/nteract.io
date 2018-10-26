// @flow
import * as React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import styled, { ServerStyleSheet } from "styled-components";

import type { Context } from "next";

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
          <NextScript />
        </body>
      </html>
    );
  }
}
