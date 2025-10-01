import * as React from "react";
import { StyledHero } from "@components/hero/styled";
import { Type } from "@components/typography";
import HeroPattern from "./pattern";

type TitleProps = {
  component?: string;
  children: React.ReactNode;
  [key: string]: any;
};

const Title = ({ component = "h1", ...rest }: TitleProps) => {
  const TextComponent = Type[
    component as keyof typeof Type
  ] as React.ElementType;
  return <TextComponent {...rest} padding="0 0 20px 0" />;
};

type HeroProps = {
  color?: string;
  children: React.ReactNode;
  [key: string]: any;
};

const HeroComponent = ({ color = "#334865", children, ...rest }: HeroProps) => {
  return (
    <StyledHero color={color} {...rest}>
      <StyledHero.Background>
        <HeroPattern />
      </StyledHero.Background>
      <StyledHero.Wrapper>{children}</StyledHero.Wrapper>
    </StyledHero>
  );
};

const Hero = Object.assign(HeroComponent, {
  Pane: StyledHero.Pane,
  Title: Title,
});

export { Hero };
