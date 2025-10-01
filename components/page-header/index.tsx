import React from "react";
import { StyledPageHeader } from "./styled";
import { Type } from "./../typography";

interface PageHeaderProps {
  children?: React.ReactNode;
  themeColor?: string;
}

const Title = ({ children }: { children?: React.ReactNode }) => (
  <Type.h1>{children}</Type.h1>
);

const Left = ({ children }: { children?: React.ReactNode }) => (
  <StyledPageHeader.Left>{children}</StyledPageHeader.Left>
);

const Right = ({ children }: { children?: React.ReactNode }) => (
  <StyledPageHeader.Right>{children}</StyledPageHeader.Right>
);

const PageHeader = ({ children, themeColor }: PageHeaderProps) => (
  <StyledPageHeader style={{ backgroundColor: themeColor }}>
    <StyledPageHeader.Wrapper>{children}</StyledPageHeader.Wrapper>
  </StyledPageHeader>
);

PageHeader.Title = Title;
PageHeader.Left = Left;
PageHeader.Right = Right;

export { PageHeader };
