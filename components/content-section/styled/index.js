// @flow
import styled, { css } from 'styled-components';
import { sif, wrapperStyles } from '@common/styled';

const gutter = 40;

const Title = styled.div`
  padding-bottom: 20px;
  max-width: 80%;
  ${sif('kernel')(
    css`
      max-width: 100%;
      width: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
  )};
`;

const Pane = styled.div`
  @media (min-width: 801px) {
    width: 50%;
    ${sif('full')(
      css`
        width: 100%;
      `,
    )};
  }
  img {
    max-width: 100%;
    display: block;
  }

  ${sif('visual')(
    css`
      @media (max-width: 800px) {
        padding-top: 80px;
      }
    `,
  )};

  @media (min-width: 801px) {
    &:nth-of-type(1) {
      order: 1;
      padding-right: ${gutter}px;
      padding-left: 0;
    }
    &:nth-of-type(2) {
      order: 2;
      padding-left: ${gutter}px;
      padding-right: 0;
    }
    ${sif('visual')(
      css`
        width: 48%;
      `,
    )};
    ${sif('isOdd')(
      css`
        &:nth-of-type(1) {
          order: 2;
          padding-left: ${gutter}px;
          padding-right: 0;
        }
        &:nth-of-type(2) {
          order: 1;
          padding-right: ${gutter}px;
          padding-left: 0;
        }
      `,
    )};
  }
`;
const Wrapper = styled.div`
  ${wrapperStyles};
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 800px) {
    display: block;
  }
`;

const StyledContentSection = styled.section`
  &:nth-of-type(even) {
    background: rgba(51, 72, 101, 0.06);
  }
  padding: 80px 0;
  pre {
    width: 100%;
    code {
      width: 100%;
    }
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
  img {
    max-width: 60px;
    max-height: 60px;
    display: block;
    margin-right: 20px;
  }
`;

StyledContentSection.Wrapper = Wrapper;
StyledContentSection.Pane = Pane;
StyledContentSection.Title = Title;
StyledContentSection.Title.Section = TitleSection;

export { StyledContentSection };
