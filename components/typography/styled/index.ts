import styled, { css } from "styled-components";
import { fonts } from "@common/constants";
import { colors } from "@common/colors";
import { sif } from "@common/styled";

type StyledProps = {
  color?: string;
  $padding?: string;
  margin?: string;
};

export const headingDefaults = () => css<StyledProps>`
  font-family: ${fonts.headings};
  @media (min-width: 801px) {
    max-width: 100%;
  }
  margin: 0;
  padding: 0;
  color: currentColor;
  font-weight: 300;
  ${({ color }) => color && css`color: ${color};`};
  ${({ $padding }) => $padding && css`padding: ${$padding};`};
  ${({ margin }) => margin && css`margin: ${margin};`};
  line-height: 1.2;
  margin-bottom: 1.5rem;
  margin-top: 0;
`;

const bodyDefaults = css<StyledProps>`
  line-height: 1.75em;
  margin: 0;
  padding: 0;
  ${({ color }) => color && css`color: ${color};`};
  ${({ $padding }) => $padding && css`padding: ${$padding};`};
  ${({ margin }) => margin && css`margin: ${margin};`};
`;

type BashPreProps = {
  bgColor?: string;
  color?: string;
};

const BashPre = styled.pre<BashPreProps>`
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
  display: block;
  overflow-x: auto !important;
  padding: 0.5em;
  color: ${colors.colorTextBase};
  ${({ color }) => color && css`color: ${color};`}
  ${({ bgColor }) => bgColor && css`background: ${bgColor};`};
`;

type HeadingProps = {
  color?: string;
  $padding?: string;
  margin?: string;
};

const h1 = styled.h1<HeadingProps>`
  ${headingDefaults()};
  font-size: 2.25rem;
`;

const h2 = styled.h2<HeadingProps>`
  font-size: 2rem;
  ${headingDefaults()};
`;

const h3 = styled.h3<HeadingProps>`
  font-size: 1.75rem;
  ${headingDefaults()};
`;

const h4 = styled.h4<HeadingProps>`
  font-size: 1.5rem;
  ${headingDefaults()};
`;

const h5 = styled.h5<HeadingProps>`
  font-size: 1.2rem;
  ${headingDefaults()};
`;

const h6 = styled.h6<HeadingProps>`
  ${headingDefaults()};
  font-size: 1rem;
`;

type PProps = {
  color?: string;
  $padding?: string;
  margin?: string;
  $small?: boolean;
};

const p = styled.p<PProps>`
  color: rgb(51, 72, 101);
  ${bodyDefaults};
  & + & {
    margin-top: 20px;
  }

  ${sif("$small")(css`
    font-size: 12px;
  `)};
`;

const StyledType = styled.div`` as typeof styled.div & {
  h1: typeof h1;
  h2: typeof h2;
  h3: typeof h3;
  h4: typeof h4;
  h5: typeof h5;
  h6: typeof h6;
  p: typeof p;
};

StyledType.h1 = h1;
StyledType.h2 = h2;
StyledType.h3 = h3;
StyledType.h4 = h4;
StyledType.h5 = h5;
StyledType.h6 = h6;
StyledType.p = p;

export { StyledType, BashPre };
