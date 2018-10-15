import styled, { css } from 'styled-components';
import { handheld, desktop } from '@common/mixins'
const Video = ({ mp4, webm, poster }) => (
  <video poster={poster} preload="auto" autoPlay muted loop="loop">
    {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    {webm ? <source src={webm} type="video/webm" /> : null}
  </video>
);
export { Video, StyledVideoPlaceholder };
