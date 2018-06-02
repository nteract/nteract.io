import styled, { css } from 'styled-components';
import { sif, defaultWrapper } from '@common/styled';

const Wrapper = styled(defaultWrapper)``;
const Section = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    flex-direction: column;
    & + & {
      padding-top: 40px;
    }
  }
  a {
    padding: 6px;
    color: #334865;
    text-decoration: none;
    opacity: 0.5;
    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

const StyledFooter = styled.footer`
  background: #edf1f7;
  padding-top: 60px;
  padding-bottom: 60px;
`;

StyledFooter.Wrapper = Wrapper;
StyledFooter.Section = Section;
export { StyledFooter };
