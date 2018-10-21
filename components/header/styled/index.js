import styled, { css } from 'styled-components';
import { spacing } from '@common/constants';
import { wrapperStyles, sif } from '@common/styled';

const NavWrapper = styled.div`
  ${sif('desktop')(
    css`
      @media (max-width: 800px) {
        display: none;
      }
    `,
  )};
  ${sif('row')(
    css`
      @media (min-width: 801px) {
        padding-left: 10px;
      }
      a {
        padding-left: 10px !important;
      }
      flex-direction: row !important;
      @media (max-width: 800px) {
        padding-top: 20px;
        a + a {
          padding-left: 10px;
        }
      }
    `,
  )};
  display: flex;
`;

const Logo = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 9999;
  max-width: 140px;
  min-width: 140px;
  margin-top: 6px;
  margin-right: 12px;
`;
const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  z-index: 100;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 40px;
  ${NavWrapper} {
    flex-direction: column;
    color: white;
    text-align: right;
    align-items: flex-end;
    justify-content: flex-end;
    a {
      font-size: 20px;
      text-decoration: none;
      color: white;
      z-index: 101;
      padding-top: 10px;
    }
  }
  @media (min-width: 800px) {
    display: none;
  }
`;

const MobileMenuButton = styled.div`
  position: absolute;
  z-index: 999999;
  top: 40px;
  right: 20px;
  @media (min-width: 800px) {
    display: none;
  }
`;

const StyledHeader = styled.header`
  height: ${spacing.headerHeight}px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;

  a {
    color: white;
    opacity: 0.5;
    text-decoration: none;
    padding: 0 0 0 ${spacing.gutter}px;
    transform: translateY(8px);
    font-weight: 500;
    display: block;

    &:hover {
      opacity: 1;
    }
  }
`;
const Wrapper = styled.div`
  ${wrapperStyles};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

const Section = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  img {
    display: block;
    max-width: 160px;
    padding: ${spacing.unit}px;
    padding-left: 0;
  }

  &:last-of-type {
    justify-content: flex-end;
  }
`;
StyledHeader.Logo = Logo;
StyledHeader.Wrapper = Wrapper;
StyledHeader.Section = Section;
StyledHeader.NavWrapper = NavWrapper;
StyledHeader.MobileMenu = MobileMenu;
StyledHeader.MobileMenuButton = MobileMenuButton;

export { StyledHeader };
