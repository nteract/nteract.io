import React from "react";
import { Button, Buttons } from "@components/button";
import { Type } from "@components/typography";
import WindowsIcon from "mdi-react/MicrosoftWindowsIcon";
import LinuxIcon from "mdi-react/LinuxIcon";
import AppleIcon from "mdi-react/AppleIcon";
import styled, { css } from "styled-components";

interface OSProps {
  platform: string;
  assetUrl: string;
}

export const StyledFeaturette = styled.div``;

export const DownloadFeaturette = ({ platform, assetUrl }: OSProps) => {
  return (
    <>
      <Buttons padding="20px 0 0 0">
        <Button
          $primary
          label={`Try the nteract desktop app for ${platform}`}
          href={assetUrl}
          icon="/icon_nteract_download.svg"
        />
      </Buttons>
      <Type.p $small $padding="10px 0 0 0">
        <span style={{ display: "flex", alignItems: "center" }}>
          Download for&nbsp;
          <a
            href="https://github.com/nteract/nteract/releases/latest"
            target="_blank"
          >
            other platforms
          </a>
          &nbsp;&nbsp;
          <WindowsIcon color="currentColor" size={16} />
          <LinuxIcon color="currentColor" size={16} />
          <AppleIcon color="currentColor" size={16} />
        </span>
      </Type.p>
    </>
  );
};
