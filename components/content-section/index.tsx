import * as React from "react";
import { Type } from "@components/typography";
import { StyledContentSection } from "./styled";

type TitleProps = {
  children: React.ReactNode;
  typeProps?: React.ComponentProps<typeof Type.h2>;
  titleProps?: React.ComponentProps<typeof StyledContentSection.Title>;
};

const Title = ({ children, typeProps, ...titleProps }: TitleProps) => (
  <StyledContentSection.Title {...titleProps}>
    <Type.h2 {...typeProps}>{children}</Type.h2>
  </StyledContentSection.Title>
);

type ContentSectionProps = {
  index?: number;
  children?: React.ReactNode;
  center?: boolean;
};

const ContentSectionComponent = ({
  index = 0,
  children,
  ...rest
}: ContentSectionProps) => {
  const isOdd = parseInt(index.toString()) % 2;
  return (
    <StyledContentSection {...rest}>
      <StyledContentSection.Wrapper>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as React.ReactElement, { isOdd })
        )}
      </StyledContentSection.Wrapper>
    </StyledContentSection>
  );
};

const ContentSection = Object.assign(ContentSectionComponent, {
  Pane: StyledContentSection.Pane,
  Title: Object.assign(Title, {
    Section: StyledContentSection.Title.Section,
  }),
});

type ContentSectionsProps = {
  children: React.ReactNode;
};

const ContentSections = ({ children }: ContentSectionsProps) =>
  React.Children.map(children, (child, index) =>
    React.cloneElement(child as React.ReactElement, { index })
  );

export { ContentSection, ContentSections };
