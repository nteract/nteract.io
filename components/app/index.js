import React from 'react';
import { injectGlobal } from 'styled-components';
import { StyledApp } from '@components/app/styled';

const App = (props) => {
  injectGlobal`
  body, html{
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;=
  }
`;
  return <StyledApp {...props}>{props.children}</StyledApp>;
};

export { App };
