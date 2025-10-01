import * as React from "react";
import Layout from "@components/layout";
import { ContentSection } from "@components/content-section";
import { Type } from "@components/typography";
import { PageHeader } from "@components/page-header";
import type { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
  pathname?: string;
}

export default class Error extends React.Component<ErrorProps> {
  static getInitialProps({ res, err, pathname }: NextPageContext): ErrorProps {
    const statusCode = res ? res.statusCode : err ? err.statusCode : undefined;
    return { statusCode, pathname: pathname || "" };
  }

  render() {
    let message;
    console.log(this.props.statusCode);
    switch (this.props.statusCode) {
      case undefined:
        message = <Type.p>Unknown error, no status code to report.</Type.p>;
        break;
      case 404:
        message = (
          <>
            <Type.h1 style={{ fontSize: "70px", fontWeight: "900", margin: 0 }}>
              404 😨
            </Type.h1>
            <ContentSection.Pane style={{ margin: 0 }}>
              {`${this.props.pathname} not on nteract.io. Raise an issue on `}
              <a href="https://github.com/nteract/nteract.io/issues">
                the nteract.io github repository
              </a>
              {`. For now though, you can make your way `}
              <a href="/">Home</a>
            </ContentSection.Pane>
          </>
        );
        break;
      default:
        message = <Type.p>{`An error ${this.props.statusCode}`}</Type.p>;
        break;
    }
    return (
      <Layout>
        <PageHeader themeColor="#334865" />
        <ContentSection center>{message}</ContentSection>
      </Layout>
    );
  }
}
