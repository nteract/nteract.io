import React from "react";
import { createGlobalStyle } from "styled-components";
import { StyledApp } from "@components/app/styled";
import { normalize } from "polished";
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
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
