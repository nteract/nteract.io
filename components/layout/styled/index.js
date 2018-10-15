
import styled, { css } from 'styled-components';
import { spacing, colors, effects, animations } from '@common/constants'
import { handheld } from '@common/mixins';
export const StyledPage = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`


export const StyledGridWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
`
export const StyledPerson = styled.div`
    max-width: calc(25% - 60px);
    width: calc(25% - 60px);
    @media screen and (max-width: 575px) {
        width: 100%;
    }
    min-width: 180px;
    margin: 30px;
    padding: 10px;
`
export const StyledPersonAvatar = styled.div`
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0px 3px 18px rgba(42, 42, 42, 0.09);
    img {
        display: block;
    }
`

export const StyledPersonDetails = styled.div`
    text-align: center;
    padding-top: 20px;
`

export const StyledPersonName = styled.div`
    font-size: 1.45rem;
`

export const StyledPersonTitle = styled.div`
    padding-top: 8px;
    font-style: italic;
`

export const StyledPersonSocial = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
`

export const StyledPersonSocialItem = styled.div`
    font-size: 1.5rem;
    padding: 5px;
    display: block;
`

// TODO (translate & + & to css)
export const StyledKernelHeaderButton = styled.div`
    border: 1px solid rgba(${colors.colorTextBase}, 0.15);
    background: white;
    box-shadow: ${effects.dropShadowLight};
    border-radius: 8px;
    padding: ${spacing.unit};
    display: block;
    transition: ${animations.transition};
    :hover {
        transform: translateY(-4px);
        box-shadow: ${effects.dropShadowLLight};
    }
    & + & {
        margin-left: ${spacing.gutter};
    }
`
export const StyledLayout = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    body {
        @include animationFadein-sm();
        background: #ffffff;
    }

    * {
        box-sizing: border-box;
    }
    img {
        max-width: 100%;
    }
    pre {
        padding: ${spacing.gutter} !important;
        max-width: 100% !important;
        overflow-x: scroll;
        box-shadow: ${effects.dropShadowPressed};
    }
`;
