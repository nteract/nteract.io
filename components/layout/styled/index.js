
import styled, { css } from 'styled-components';

export const StyledLayout = styled.div`
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

    .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .page {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    }
    pre {
    padding: $gutter !important;
    max-width: 100% !important;
    overflow-x: scroll;
    box-shadow: $drop-shadow-pressed;
    }
    .kernel {
    width: 100%;
    display: flex;
    padding: $gutter*2 0;
    max-width: 100%;

    &-wrapper {
        flex: 1;
        max-width: 100%;
    }
    &-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-bottom: $unit;
        border-bottom: 1px solid rgba($color-text-base, 0.15);
        margin-bottom: $gutter;
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
            margin-bottom: $gutter;
        }
        .lang-logo {
            margin-right: $unit;
            max-width: 48px;
        }
        }
        &-buttons {
        display: flex;
        }
        &-button {
        border: 1px solid rgba($color-text-base, 0.15);
        background: white;
        box-shadow: $drop-shadow-light;
        border-radius: 8px;
        padding: $unit;
        display: block;
        transition: $transition;
        &:hover {
            transform: translateY(-4px);
            box-shadow: $drop-shadow-l-light;
        }
        & + & {
            margin-left: $gutter;
        }
        }
    }
    }
    .grid-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    }
    .person {
    max-width: calc(25% - 60px);
    width: calc(25% - 60px);
    @media screen and (max-width: 575px) {
        width: 100%;
    }
    min-width: 180px;
    margin: 30px;
    padding: 10px;
    }
    .person-avatar {
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.12);
    box-shadow: 0px 3px 18px rgba(42, 42, 42, 0.09);
    img {
        display: block;
    }
    }
    .person-details {
    text-align: center;
    padding-top: 20px;
    }
    .person-name {
    font-size: 1.45rem;
    }
    .person-title {
    padding-top: 8px;
    font-style: italic;
    }
    .person-social {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    }
    .social-item {
    font-size: 1.5rem;
    padding: 5px;
    display: block;
    }
`
