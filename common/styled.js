import styled, { css } from 'styled-components';
import { spacing } from '@common/constants';

const sif = (prop) => (styles) => (props) => props[prop] && styles;
const bgColor = ({ bgColor }) => 
  bgColor &&
  css`
    background: ${bgColor};
  `;

const color = ({ color }) =>
  color &&
  css`
    color: ${color};
  `;

const margin = ({ margin }) =>
  margin &&
  css`
    margin: ${margin};
  `;

const padding = ({ padding }) =>
  padding &&
  css`
    padding: ${padding};
  `;

const wrapperStyles = css`
  margin-right: auto;
  margin-left: auto;
  max-width: ${spacing.globalWidth}px;
  padding: 0 60px;
  @media (max-width: 800px) {
    padding: 0 25px;
  }
  width: 100%;
  flex-grow: 1;
  position: relative;
  z-index: 20;
  ${padding};
  ${margin};
`;

const defaultWrapper = styled.div`
  ${wrapperStyles};
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 800px) {
    display: block;
  }
`;

export { wrapperStyles, defaultWrapper, sif, bgColor, color, margin, padding };
