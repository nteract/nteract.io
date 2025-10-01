import React from "react";

import { StyledButton, StyledButtons } from "@components/button/styled";

interface IconProps {
  icon?: string;
}

const Icon = ({ icon }: IconProps) =>
  icon ? <img src={icon} role="presentational" /> : null;

interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  icon?: string;
  [key: string]: any;
}

const Button = ({ label, children, icon, ...rest }: ButtonProps) => {
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
