// @flow
import * as React from 'react';
import { Type } from '@components/typography';
import { StyledContentSection } from './styled';

const renderPanes = (panes, isOdd) =>
  panes.map((pane, i) => (
    <StyledContentSection.Pane key={i} isOdd={isOdd} visual={pane.visual}>
      {pane.children}
    </StyledContentSection.Pane>
  ));

type TitleProps = {
  children: React.Node,
  typeProps?: *,
  titleProps?: *,
};

const Title = ({ children, typeProps, ...titleProps }: TitleProps) => (
  <StyledContentSection.Title {...titleProps}>
    <Type.h2 {...typeProps}>{children}</Type.h2>
  </StyledContentSection.Title>
);

type ContentSectionProps = {
  index: number,
  children?: React.Node,
  panes: *,
};

const ContentSection = ({
  index,
  children,
  panes,
  ...rest
}: ContentSectionProps) => {
  const isOdd = parseInt(index) % 2;
  return (
    <StyledContentSection {...rest}>
      <StyledContentSection.Wrapper>
        {panes ? renderPanes(panes, isOdd) : children}
      </StyledContentSection.Wrapper>
    </StyledContentSection>
  );
};

ContentSection.defaultProps = {
  index: 0,
};

ContentSection.Pane = StyledContentSection.Pane;
ContentSection.Title = Title;

type ContentSectionsProps = {
  children: React.Node,
};

const ContentSections = ({ children }: ContentSectionsProps) =>
  React.Children.map(children, (child, index) =>
    React.cloneElement(child, { index }),
  );

export { ContentSection, ContentSections };
