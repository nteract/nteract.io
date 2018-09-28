import styled, { css } from 'styled-components';
import { spacing, effects, animations } from '@common/constants'
import { sif } from '@common/styled'

export const StyledKernelListItem = styled.li`
    ${sif('selected')(css`
            background: 'linear-gradient(180deg,#8518f2,#8518f2)';
            color: '#EDF1F7';
            a:visited, .kernel-selected a {
                color: white;
            }
        `)
    }
`

export const StyledLanguageToggle = styled.section`
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
