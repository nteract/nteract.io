
import styled, { css } from 'styled-components';
import { animations } from '@common/constants';
import { sif } from '@common/styled';

const Delay = () => styled.div`
${sif('xl')(css`
    animation-delay: 2s;
`)}
${sif('l')(css`
    animation-delay: 1s;
`)}
${sif('m')(css`
    animation-delay: 0.5s;
`)}
${sif('s')(css`
    animation-delay: 0.25s;
`)}
`f

const FadeIn = () => styled.div`
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
opacity: 0;
animation: fadein ${animations.timingAnimation} forwards ${animations.easing};
`

const FadeOut = () => styled.div`
@keyframes fadeout {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
animation: fadeout ${animations.timingAnimation} forwards ${animations.easing};
`

const FadeAndSlideInFromBottom = () => styled.div`
@keyframes fade-and-slide-in-from-bottom {
    from {
        opacity: 0;
        transform: translate3d(0, ${spacing.gutter*4}, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}
opacity: 0;
animation: fade-and-slide-in-from-bottom ${animations.timingAnimation} forwards
  ${animations.easing};
`

const FadeInAndSlideInFromBottomSm = () => styled.div`
@keyframes fade-and-slide-in-from-bottom {
    from {
        opacity: 0;
        transform: translate3d(0, ${spacing.unit}, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}
opacity: 0;
animation: fade-and-slide-in-from-top-sm ${animations.timingAnimation} forwards
  ${animations.easing};
`

const FadeInAndSlideInFromTop = () => styled.div`
@keyframes fade-and-slide-in-from-top {
    from {
        opacity: 0;
        transform: translate3d(0, -${spacing.gutter*4}, 0);
    }
    to {
        opacity: 1;
        transform: none;
    }
}
opacity: 0;
animation: fade-and-slide-in-from-top ${animations.timingAnimation} forwards
    ${animations.easing};
`

const FadeInAndSlideInFromTopSm = () => css`
@keyframes fade-and-slide-in-from-top-sm {
    from {
        opacity: 0;
        transform: translate3d(0, -${spacing.unit}, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}
opacity: 0;
animation: fade-and-slide-in-from-top-sm ${animations.timingAnimation} forwards
  ${animations.easing};
`


