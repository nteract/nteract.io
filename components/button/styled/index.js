import styled, { css } from 'styled-components';
import { spacing, colors } from '@common/constants';
import { sif, padding, margin } from '@common/styled';
import { lighten } from 'polished';
const StyledButtons = styled.div`
  display: flex;
  ${padding};
  ${margin};
`;

const StyledButton = styled.a.attrs({
  className: 'ripple',
})`
  display: flex;
  align-items: center;
  padding: ${spacing.unit}px ${spacing.gutter}px;
  border-radius: 4px;
  user-select: none;
  outline: none;
  text-decoration: none !important;

  &.animating {
    background-image: paint(ripple);
  }
  box-shadow: 0 4px 8px 0 rgba(50, 72, 101, 0.1),
    0 2px 2px 0 rgba(50, 72, 101, 0.1);
  border: 0;

  transition: 0.2s ease-in-out all;

  &:hover {
    transform: translateY(-2px);
    cursor: pointer;
  }
  &:active {
    transform: translateY(2px);
  }

  --ripple-x: 0;
  --ripple-y: 0;
  --ripple-color: rgba(255, 255, 255, 0.5);
  --animation-tick: 200;

  ${sif('primary')(
    css`
      background-color: #f02563;
      color: white;
      font-weight: 400;
      text-shadow: 0 1px 2px rgba(8, 12, 16, 0.5);

      &:hover {
        background-color: ${lighten(0.05, '#f02563')};
      }
    `
  )};
  ${sif('secondary')(css`
    background: rgba(163, 183, 213, 0.15);
    color: #c8d4e5;
    padding-left: 18px;
    padding-right: 18px;
    -webkit-box-shadow: 0px 2px 6px rgba(8, 12, 16, 0.08);
    box-shadow: 0px 2px 6px rgba(8, 12, 16, 0.08);
    text-shadow: 0px 1px 2px rgba(8, 12, 16, 0.5);
  `)}
  ${sif('active')(css`
    background-color: ${colors.darkNavyColor};
  `)}
  ${StyledButton}:not(:first-child) {
    margin-left: 12px;
  }
`;

const Label = styled.div``;
const Icon = styled.div`
  max-width: 36px;
  margin-right: 8px;
  img {
    max-width: 100%;
    display: block;
  }
`;

StyledButton.Label = Label;
StyledButton.Icon = Icon;

export { StyledButton, StyledButtons };
