import React from 'react';

import { StyledButton, StyledButtons } from '@components/button/styled';

const Icon = ({ icon }) => {
  if (icon.includes('http')) {
    return <img src={icon} role="presentational" />;
  }
};

const Button = ({ label, children, icon, ...rest }) => {
  return (
    <StyledButton {...rest}>
      <StyledButton.Icon>
        <Icon icon={icon} />
      </StyledButton.Icon>
      <StyledButton.Label>{label || children}</StyledButton.Label>
    </StyledButton>
  );
};

export { Button, StyledButtons as Buttons };
