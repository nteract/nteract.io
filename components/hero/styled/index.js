import styled, { css } from 'styled-components';
import { spacing } from '@common/constants';
import { colors } from '@common/colors';
import { margin, padding, wrapperStyles } from '@common/styled';
import { Type } from '@components/typography';

const Background = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  svg {
    position: absolute;
    width: calc(${spacing.globalWidth}px + 200px) !important;
    min-width: calc(${spacing.globalWidth}px + 200px) !important;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left 70%,
      left bottom,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
  }
`;
const Wrapper = styled.div`
  ${wrapperStyles};
  color: white;
  display: flex;
`;

const Pane = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    max-width: 100%;
    display: block;
  }

  &:last-of-type {
    justify-content: flex-end;
  }
  video {
    display: block;
    max-width: 100%;
  }
  ${({ width }) => css`
    width: ${width ? width : '50%'};
  `};

  ${padding};
  ${margin};
`;

const StyledHero = styled.div`
  background-color: ${({ color }) => (color ? color : colors.darkNavyColor)};
  padding-top: ${spacing.headerHeight}px;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  position: relative;
  a{
    &:link,
    &:visited, 
    &:active,
    &:hover{
      color: white;
      text-decoration: none;
    }
    &:hover{
      text-decoration: underline;
    }
  }
  @media (max-width: 800px) {
    ${Wrapper} {
      flex-direction: column;
      min-height: 0;

      ${Pane} {
        width: 100%;
      }
      ${Pane} + ${Pane} {
        padding-top: 20px;
      }
    }
  }

  ${Type.p}{
  color: rgba(255, 255, 255, 0.5);
  }
`;

StyledHero.Background = Background;
StyledHero.Wrapper = Wrapper;
StyledHero.Pane = Pane;

export { StyledHero };
