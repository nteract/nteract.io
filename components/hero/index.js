// @flow
import * as React from 'react';
import { StyledHero } from '@components/hero/styled';
import { Type } from '@components/typography';
import { Button, Buttons } from '@components/button';
import HeroPattern from './pattern';

import { colors } from '@common/constants';

type TitleProps = {
  component: string,
};

const Title = ({ component, ...rest }: TitleProps) => {
  const TextComponent = Type[component];
  return <TextComponent {...rest} padding="0 0 20px 0" />;
};

Title.defaultProps = {
  component: 'h1',
};

type HeroProps = {
  color: string,
  children: React.Node,
};

const Hero = ({ color, children, ...rest }: HeroProps) => {
  return (
    <StyledHero color={color} {...rest}>
      <StyledHero.Background>
        <HeroPattern />
      </StyledHero.Background>
      <StyledHero.Wrapper>{children}</StyledHero.Wrapper>
    </StyledHero>
  );
};

Hero.defaultProps = {
  color: colors.darknavy,
};

Hero.Pane = StyledHero.Pane;
Hero.Title = Title;

export { Hero };
