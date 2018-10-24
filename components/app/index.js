import React from "react";
import { createGlobalStyle } from "styled-components";
import { StyledApp } from "@components/app/styled";

const GlobalStyles = createGlobalStyle`
body, html{
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;=
}
`;

const App = props => {
  return (
    <>
      <GlobalStyles />
      <StyledApp {...props}>{props.children}</StyledApp>
    </>
  );
};

export { App };
