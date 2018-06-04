// @flow
import * as React from 'react';
import { StyledHero } from '@components/hero/styled';
import { Type } from '@components/typography';
import { Button, Buttons } from '@components/button';
import HeroPattern from './pattern';

import { colors } from '@common/constants';

const Title = ({ component = 'h1', ...rest }) => {
  const TextComponent = Type[component];
  return <TextComponent {...rest} padding="0 0 20px 0" />;
};

const Actions = ({ items, message, ...buttonsProps }) =>
  items.length ? (
    <>
      <Buttons {...buttonsProps}>
        {items.map(({ children, ...buttonProps }, i) => (
          <Button key={i} {...buttonProps} />
        ))}
      </Buttons>
      {message && message}
    </>
  ) : null;

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
Hero.Actions = Actions;
Hero.Title = Title;

export { Hero };
