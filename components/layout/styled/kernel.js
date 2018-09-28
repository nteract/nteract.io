import styled, { css } from 'styled-components';

export const StyledKernel = styled.div`
    width: 100%;
    display: flex;
    padding: ${spacing.gutter*2} 0;
    max-width: 100%;

    &-wrapper {
        flex: 1;
        max-width: 100%;
    }
    &-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: ${spacing.unit};
        border-bottom: 1px solid rgba($color-text-base, 0.15);
        margin-bottom: ${spacing.gutter};
        @include handheld {
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        h2 {
            margin: 0;
            display: flex;
            align-items: center;
            @include handheld {
                margin-bottom: ${spacing.gutter};
            }
            .lang-logo {
                margin-right: ${spacing.unit};
                max-width: 48px;
            }
        }
        &-buttons {
            display: flex;
        }
        &-button {
            border: 1px solid rgba($color-text-base, 0.15);
            background: white;
            box-shadow: ${effects.dropShadowLight};
            border-radius: 8px;
            padding: ${spacing.unit};
            display: block;
            transition: ${animations.transition};
            &:hover {
                transform: translateY(-4px);
                box-shadow: ${effects.dropShadowLLight};
            }
            & + & {
                margin-left: ${spacing.gutter};
            }
        }
    }
`
