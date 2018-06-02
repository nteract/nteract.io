import React from 'react';
import { StyledHero } from '@components/hero/styled';
import { Type } from '@components/typography';
import { Button, Buttons } from '@components/button';
import HeroPattern from './pattern';

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

const Content = ({ panes, ...rest }) =>
  panes.length
    ? panes.map(({ children, title, actions, ...paneProps }, i) => (
        <StyledHero.Pane key={i} {...paneProps}>
          {title && <Title {...title} />}
          {children}
          {actions && <Actions {...actions} />}
        </StyledHero.Pane>
      ))
    : null;

const Hero = ({ color, content, ...rest }) => {
  return (
    <StyledHero color={color} {...rest}>
      <StyledHero.Background>
        <HeroPattern />
      </StyledHero.Background>
      <StyledHero.Wrapper>
        <Content {...content} />
      </StyledHero.Wrapper>
    </StyledHero>
  );
};

export { Hero };
