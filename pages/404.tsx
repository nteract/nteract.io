import React from "react";
import Layout from "@components/layout";
import { ContentSection } from "@components/content-section";
import { Type } from "@components/typography";
import { PageHeader } from "@components/page-header";

const Custom404 = () => {
  return (
    <Layout>
      <PageHeader themeColor="#334865">
        <PageHeader.Left>
          <PageHeader.Title>404 - Page Not Found</PageHeader.Title>
          <Type.p>
            The page you're looking for doesn't exist or has been moved.
          </Type.p>
        </PageHeader.Left>
      </PageHeader>
      <ContentSection $center>
        <ContentSection.Pane $center>
          <Type.h2>Oops! We couldn't find that page.</Type.h2>
          <Type.p>
            Try going back to the <a href="/">homepage</a>.
          </Type.p>
        </ContentSection.Pane>
      </ContentSection>
    </Layout>
  );
};

export default Custom404;
