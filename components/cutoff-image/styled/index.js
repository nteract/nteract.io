// @flow
import styled, { css } from 'styled-components';
import { spacing } from '@common/constants';
import { sif, padding, margin } from '@common/styled';
import { lighten } from 'polished';

const StyledCutoffImage = styled.img`
  position: absolute;
  top: 80px;
  z-index: 4;
  transition: 0.2s ease-in-out all;
  left: 0;
  max-width: 100%;
  /**
  @include tablet {
    width: 120%;
    max-width: 200%;
  }
  @include tablet {
    top: 80px;
  }
  **/
  &:hover {
    top: 40px;
    /*@include tablet {
      top: 50px;
    }*/
  }
`;

export { StyledCutoffImage };
