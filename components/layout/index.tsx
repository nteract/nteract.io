import React from "react";
import Head from "../head";
import { StyledLayout, StyledPage } from "./styled";
import { Header } from "../header";
import { Footer } from "../footer";

interface LayoutProps {
  pageTitle?: string;
  themeColor?: string;
  children?: React.ReactNode;
}

const Index = ({ pageTitle, themeColor, children }: LayoutProps) => {
  return (
    <StyledLayout>
      <Head pageTitle={pageTitle} />
      <StyledPage>{children}</StyledPage>
    </StyledLayout>
  );
};

export default Index;
