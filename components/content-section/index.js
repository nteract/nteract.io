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
  children: React.Node,
  panes: *,
  rest: *,
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

ContentSection.Pane = StyledContentSection.Pane;
ContentSection.Title = Title;

type ContentSectionsProps = {
  sections: Array<{
    panes: Array<{
      children: React.Node,
      visual?: boolean,
    }>,
  }>,
};

const ContentSections = ({ sections }: ContentSectionsProps) =>
  sections.map((section, i) => (
    <ContentSection key={i} index={i} {...section} />
  ));

export { ContentSection, ContentSections };
