// @flow
import * as React from 'react';
import { StyledHero } from '@components/hero/styled';
import { Type } from '@components/typography';
import HeroPattern from './pattern';

import { colors } from '@common/colors';

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

Hero.Pane = StyledHero.Pane;
Hero.Title = Title;

export { Hero };
