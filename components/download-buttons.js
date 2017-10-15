// @flow
import React from "react";

const WindowsIcon = () => (
  <div className="footnote-icon">
    <svg viewBox="0 0 24 24">
      <path
        fill="#000000"
        d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z"
      />
    </svg>
  </div>
);

const LinuxIcon = () => (
  <div className="footnote-icon">
    <svg viewBox="0 0 24 24">
      <path
        fill="#000000"
        d="M13.18,14.5C12.53,15.26 11.47,15.26 10.82,14.5L7.44,10.5C7.16,11.28 7,12.12 7,13C7,14.67 7.57,16.18 8.5,17.27C10,17.37 11.29,17.96 11.78,19C11.85,19 11.93,19 12.22,19C12.71,18 13.95,17.44 15.46,17.33C16.41,16.24 17,14.7 17,13C17,12.12 16.84,11.28 16.56,10.5L13.18,14.5M20,20.75C20,21.3 19.3,22 18.75,22H13.25C12.7,22 12,21.3 12,20.75C12,21.3 11.3,22 10.75,22H5.25C4.7,22 4,21.3 4,20.75C4,19.45 4.94,18.31 6.3,17.65C5.5,16.34 5,14.73 5,13C4,15 2.7,15.56 2.09,15C1.5,14.44 1.79,12.83 3.1,11.41C3.84,10.6 5,9.62 5.81,9.25C6.13,8.56 6.54,7.93 7,7.38V7A5,5 0 0,1 12,2A5,5 0 0,1 17,7V7.38C17.46,7.93 17.87,8.56 18.19,9.25C19,9.62 20.16,10.6 20.9,11.41C22.21,12.83 22.5,14.44 21.91,15C21.3,15.56 20,15 19,13C19,14.75 18.5,16.37 17.67,17.69C19.05,18.33 20,19.44 20,20.75M9.88,9C9.46,9.5 9.46,10.27 9.88,10.75L11.13,12.25C11.54,12.73 12.21,12.73 12.63,12.25L13.88,10.75C14.29,10.27 14.29,9.5 13.88,9H9.88M10,5.25C9.45,5.25 9,5.9 9,7C9,8.1 9.45,8.75 10,8.75C10.55,8.75 11,8.1 11,7C11,5.9 10.55,5.25 10,5.25M14,5.25C13.45,5.25 13,5.9 13,7C13,8.1 13.45,8.75 14,8.75C14.55,8.75 15,8.1 15,7C15,5.9 14.55,5.25 14,5.25Z"
      />
    </svg>
  </div>
);

const MacIcon = () => (
  <div className="footnote-icon">
    <svg viewBox="0 0 24 24">
      <path
        fill="#000000"
        d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"
      />
    </svg>
  </div>
);

export const DownloadFeaturette = ({ platform, assetUrl }: OSProps) => {
  return (
    <div className="download-featurette">
      <div className="buttons buttons-hero not-mobile">
        <style jsx>
          {`
            a {
              text-decoration: none;
            }
          `}
        </style>
        <a href={assetUrl}>
          <div className="button button-primary">
            <div className="button-wrapper">
              <div className="button-icon">
                <img
                  src="https://nteract.github.io/assets/images/icon-nteract-download.svg"
                  alt="Download nteract"
                />
              </div>
              <div className="button-label">
                Download for {platform} (alpha)
              </div>
            </div>
          </div>
        </a>
      </div>

      <div className="footnote not-mobile">
        <style jsx>
          {`
            a {
              color: currentColor;
              text-decoration: none;
            }
            a:hover {
              color: white;
            }
          `}
        </style>
        <a href="https://github.com/nteract/nteract/releases/latest">
          <div className="footnote-message">Download for other platforms</div>
        </a>

        {platform !== "Windows" ? (
          <a href="https://github.com/nteract/nteract/releases/latest">
            <WindowsIcon />
          </a>
        ) : null}
        {platform !== "macOS" ? (
          <a href="https://github.com/nteract/nteract/releases/latest">
            {" "}
            <MacIcon />
          </a>
        ) : null}
        {platform !== "Linux" ? (
          <a href="https://github.com/nteract/nteract/releases/latest">
            {" "}
            <LinuxIcon />
          </a>
        ) : null}
      </div>
    </div>
  );
};
