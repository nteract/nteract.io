import { css } from 'styled-components';
import { animations, spacing } from '@common/constants';
import { sif } from '@common/styled';

export const widthTablet = 768;
export const widthDesktop = 1024;
export const widthMidSized = 1200;

export const handheld = (content) => css`  
@media (max-width: ${widthTablet -1}px) {
    ${content};
}
`
export const handheldUp = (content) => css`
@media (min-width: ${widthTablet - 1}px) {
    ${content};
}`

export const tablet = (content) => css`
@media (max-width: ${widthDesktop - 1}px) {
    ${content};
}`
export const tabletUp = (content) => css`
@media (min-width: ${widthDesktop - 1}px) {
    ${content};
}
`
export const desktop = (content) => css`
@media (min-width: ${widthDesktop}px) {
    ${content};
}
`

export const largeDisplay = (content) => css`
@media (min-width: ${spacing.globalWidth}px) {
    ${content};
}
`
export const midDown = (content) => css`
@media (max-width: 1240px) {
    ${content};
}
`

export const belowLargeDisplay = (content) => css`
    @media (max-width: ${spacing.globalWidth * 1.2}px) {
        ${content};
    }
`
export const centerContent = () => css`
margin-right: auto;
margin-left: auto;
`
export const globalWrapper = () => css`
    ${centerContent()}
    padding-left: ${spacing.gutter*2}px;
    padding-right: ${spacing.gutter*2}px;
    max-width: ${spacing.globalWidth}px;
`
export const barHighlight = () => ``
export const activeStateTransform = () => ``
export const fullSizePosAbsolute = () => ``
export const typographyTitleXl = () => ``
export const typographyTitleL = () => ``
export const typographyTitleMed = () => ``
export const typographyTitleSm = () => ``
export const alignContentCenter = () => ``
export const fullPseudoElement = () => ``
export const addPseudoToHTML = () => ``

