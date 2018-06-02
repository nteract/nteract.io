import React from 'react';
import { Type } from '@components/typography';
import { StyledContentSection } from './styled';

const renderPanes = (panes, isOdd) =>
  panes.map((pane, i) => (
    <StyledContentSection.Pane key={i} isOdd={isOdd} {...pane} />
  ));

const Title = ({ children, typeProps, ...titleProps }) => (
  <StyledContentSection.Title {...titleProps}>
    <Type.h2 {...typeProps}>{children}</Type.h2>
  </StyledContentSection.Title>
);

const ContentSection = ({ index, children, panes, ...rest }) => {
  const isOdd = parseInt(index) % 2;
  return (
    <StyledContentSection {...rest}>
      <StyledContentSection.Wrapper>
        {panes ? renderPanes(panes, isOdd) : children}
      </StyledContentSection.Wrapper>
    </StyledContentSection>
  );
};

ContentSection.Pane = StyledContentSection.Pane;
ContentSection.Title = Title;

const ContentSections = ({ sections }) =>
  sections.map((section, i) => (
    <ContentSection key={i} index={i} {...section} />
  ));

export { ContentSection, ContentSections };
