// @flow
import * as React from 'react';
import { Type } from '@components/typography';
import { StyledContentSection } from './styled';

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
};

const ContentSection = ({ index, children, ...rest }: ContentSectionProps) => {
  const isOdd = parseInt(index) % 2;
  return (
    <StyledContentSection {...rest}>
      <StyledContentSection.Wrapper>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { isOdd }),
        )}
      </StyledContentSection.Wrapper>
    </StyledContentSection>
  );
};

ContentSection.defaultProps = {
  index: 0,
};

ContentSection.Pane = StyledContentSection.Pane;
ContentSection.Title = Title;
ContentSection.Title.Section = StyledContentSection.Title.Section;

type ContentSectionsProps = {
  children: React.Node,
};

const ContentSections = ({ children }: ContentSectionsProps) =>
  React.Children.map(children, (child, index) =>
    React.cloneElement(child, { index }),
  );

export { ContentSection, ContentSections };
