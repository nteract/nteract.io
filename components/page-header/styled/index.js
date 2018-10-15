import styled, { css } from 'styled-components';
import { sif, wrapperStyles } from '@common/styled';
import { colors, spacing, effects, animations } from '@common/constants'
import { globalWrapper, handheld, tablet, desktop, tabletUp } from '@common/mixins';
import { CutoffImage } from './../../cutoff-image'
import { StyledFeaturette } from '../../download-buttons'


const StyledVideoPlaceholder = styled.div`
`
/*
  ${desktop(css`
    display: none!important;
  `)}
  display: none!important;
  ${handheld(css`
    display: inherit;
  `)}
*/
const PageHeaderMobileMessage = styled.div``
const PageHeaderWrapper = styled.div``
const PageHeaderButtons  = styled.div``
const PageHeaderButton =  styled.div`
    ${sif('secondary')(css`
        background: rgba(${colors.mainColor}, 0.5)
    `)}
    ${sif('active')(css`
        background: ${colors.mainColor}
    `)}
`
const Left = styled.div`

`

const Right = styled.div`

`
const PageHeader = styled.div`
background-color: transparent;
background-image: url(https://nteract.github.io/assets/images/hero_header_bg@2x.png);
background-position: top center;
background-attachment: fixed;
background-size: ${spacing.globalWidth+200}px;
background-repeat: no-repeat;
padding-top: ${spacing.headerHeight}px;
overflow: hidden;
${PageHeaderWrapper} {
    ${globalWrapper()}
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    padding-top: ${spacing.gutter*2}px;
    overflow: hidden;
    h1 {
      animation-delay: ${animations.timingAnimationDelay}s;
      color: white;
    }
    ${handheld(css`
        flex-direction: column;
    `)}
    ${StyledFeaturette} {
        margin-bottom: ${spacing.gutter*2}px;
    }
    ${PageHeaderButtons} {
        ${PageHeaderButton} {
            ${sif('secondary')(css`
                background: rgba(${colors.mainColor}, 0.5);
            `)}
            ${sif('active')(css`
                background: ${colors.mainColor};
            `)}
        }
    }
}
${Left} {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-right: ${spacing.gutter*2};
    padding-bottom: ${spacing.gutter*2};
    p, ${PageHeaderButtons} {
        animation-delay: ${animations.timingAnimationDelay/3}s;
    }
    ${tabletUp(css`
        max-width: 550px;
    `)}
    ${tablet(css`
        max-width: 50%;
    `)}
    ${handheld(css`
        padding-right: 0;
        padding-bottom: 0;
        padding-top: $gutter;
        align-items: flex-start;
        max-width: 100%;
        h1, p, ${PageHeaderButtons} {
            max-width: 480px;
        }
        ${PageHeaderButtons} {
            width: 100%;
            justify-content: flex-start;
        }
    `)}
}
${Right} {
    display: flex;
    align-items: flex-end;
    position: relative;
    flex: 1;
    ${CutoffImage} {
      position: absolute;
      top: 0;
      z-index: 4;
      transition: ${animations.transition};
      left: 0;
      width: 100%;
      ${tablet(css`
        top: 80px;  
        width: 120%;
        max-width: 200%;
      `)}
      :hover {
        top: -40px;
        ${tablet(css`
            top: 50px;  
        `)}
      }
    }
    ${tablet(css`
        ${StyledVideoPlaceholder} {
            display: none !important;
        }
    `)}
    ${handheld(css`
        ${StyledVideoPlaceholder} {
            display: block !important;
        }
    `)}
    video, ${StyledVideoPlaceholder} {
      margin-top: ${spacing.gutter*2}px;
      display: block;
      max-width: 100%;
      animation-delay: ${animations.timingAnimationDelay/3}s;
    }
}

`

PageHeader.Left = Left
PageHeader.Right = Right
PageHeader.Wrapper = PageHeaderWrapper 

export { PageHeader as StyledPageHeader }
