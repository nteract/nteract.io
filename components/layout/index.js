import React from "react";
import Head from "../head";
import { StyledLayout, StyledPage } from "./styled";
import { Header } from "../header";
import { Footer } from "../footer";

const Index = ({ pageTitle, themeColor, children }) => {
  return (
    <StyledLayout>
      <Head pageTitle={pageTitle} />
      <StyledPage>{children}</StyledPage>
    </StyledLayout>
  );
};

export default Index;
