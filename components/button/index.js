import React from 'react';

import { StyledButton, StyledButtons } from '@components/button/styled';

const Icon = ({ icon }) => {
  if (icon && icon.includes('http')) {
    return <img src={icon} role="presentational" />;
  }
  return null;
};

const Button = ({ label, children, icon, ...rest }) => {
  return (
    <StyledButton {...rest}>
      {icon ? (
        <StyledButton.Icon>
          <Icon icon={icon} />
        </StyledButton.Icon>
      ) : null}
      <StyledButton.Label>{label || children}</StyledButton.Label>
    </StyledButton>
  );
};

export { Button, StyledButtons as Buttons };
