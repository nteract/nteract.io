import styled, { css } from 'styled-components';
import { fonts, colors } from '@common/constants';
import { color, padding, margin, sif } from '@common/styled';

export const headingDefaults = () => css`
  font-family: ${fonts.headings};
  @media (min-width: 801px) {
    max-width: 100%;
  }
  margin: 0;
  padding: 0;
  color: currentColor;
  font-weight: 300;
  ${color};
  ${padding};
  ${margin};
  line-height: 1.2;
  margin-bottom: 1.5rem;
  margin-top: 0;
`;

const bodyDefaults = css`
  line-height: 1.75em;
  margin: 0;
  padding: 0;
  ${color};
  ${padding};
  ${margin};
`;
const BashPre = styled.pre`
    display: block;
    height: 100px;
    overflow-x: auto !important;
    padding: 0.5em;
    color: rgb(51, 51, 51);
    background: ${colors.bgColor};
`;
const StyledType = styled.div``;

const h1 = styled.h1`
  ${headingDefaults()};
  font-size: 2.25rem;
`;

const h2 = styled.h2`
  font-size: 2rem;
  ${headingDefaults()};
`;
const h3 = styled.h3`
  font-size: 1.75rem;
  ${headingDefaults()};
`;
const h4 = styled.h4`
  font-size: 1.5rem;
  ${headingDefaults()};
`;
const h5 = styled.h5`
  font-size: 1.2rem;
  ${headingDefaults()};
`;
const h6 = styled.h6`
  ${headingDefaults()};
  font-size: 1rem;
`;

const p = styled.p`
  color: rgb(51, 72, 101);
  ${bodyDefaults};
  & + & {
    margin-top: 20px;
  }

  ${sif('small')(css`
    font-size: 12px;
  `)};
`;

StyledType.h1 = h1;
StyledType.h2 = h2;
StyledType.h3 = h3;
StyledType.h4 = h4;
StyledType.h5 = h5;
StyledType.h6 = h6;
StyledType.p = p;

export { StyledType, BashPre };
