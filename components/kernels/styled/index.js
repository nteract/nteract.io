import styled, { css } from 'styled-components';
import { spacing, effects, animations } from '@common/constants'
import { sif } from '@common/styled'
import { handheld } from '@common/mixins'
export const KernelListItem = styled.li`
    ${sif('selected')(css`
            background: 'linear-gradient(180deg,#8518f2,#8518f2)';
            color: '#EDF1F7';
            a:visited, .kernel-selected a {
                color: white;
            }
        `)
    }
`
export const Kernel = styled.div`
    width: 100%;
    display: flex;
    padding: ${spacing.gutter*2} 0;
    max-width: 100%;
`
export const KernelWrapper = styled.div`
    flex: 1;
    max-width: 100%;
`
export const LangLogo = styled.div`
`
export const KernelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: ${spacing.unit};
    border-bottom: 1px solid rgba(${colors.colorTextBase}, 0.15);
    margin-bottom: ${spacing.gutter};
    ${handheld(css`
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `)}
    h2 {
        margin: 0;
        display: flex;
        align-items: center;
        ${handheld(css`
            margin-bottom: ${spacing.gutter};
        `)}
        ${LangLogo} {
            margin-right: ${spacing.unit};
            max-width: 48px;
        }
    }
`

export const KernelHeaderButtons = styled.div`
    display: flex;
`

export const KernelHeaderButton = styled.a`
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
`
// TODO what does & + & do?

export const LanguageToggle = styled.section`
    height: 41px;
    background: #334866;
    color: #EDF1F7;
    ul {
        list-style: none;
        margin-top: 0px;
    }
    li {
        display: inline-block;
        float: none;
        margin: 0;
        position: relative;
        height: 41px;
        line-height: 41px;
        text-align: center;
    }
`
