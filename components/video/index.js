// @flow
import * as React from "react";
import styled, { css } from "styled-components";
import { handheld, desktop } from "@common/mixins";

type VideoProps = { mp4?: string, webm?: string, poster?: string };

const Video = (props: VideoProps) => (
  <video poster={props.poster} preload="auto" autoPlay muted loop="loop">
    {props.mp4 ? <source src={props.mp4} type="video/mp4" /> : null}
    {props.webm ? <source src={props.webm} type="video/webm" /> : null}
  </video>
);

export { Video };
