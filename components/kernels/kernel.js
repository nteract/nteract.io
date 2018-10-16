// @flow
import * as React from "react";
import { Kernel, KernelWrapper, KernelHeader, KernelHeaderButtons, KernelHeaderButton, LangLogo } from './styled'
export type KernelProps = {
  displayName: string,
  installURL: string,
  repository: string,
  logo: string,
  children: React.Node
};

export default (props: KernelProps) => (
  <Kernel>
    <KernelWrapper>
      <KernelHeader>
        <div className="kernel-header-section">
          <h2>
            <LangLogo>
              <img src={props.logo} alt={props.displayName} />
            </LangLogo>
            {props.displayName}
          </h2>
        </div>
        <div className="kernel-header-section">
          <KernelHeaderButtons>
            <KernelHeaderButton
              href={props.repository}
              target="_blank"
            >
              {`GitHub Repository`}
            </KernelHeaderButton>{" "}
            <KernelHeaderButton
              className="kernel-header-button"
              href={props.installURL}
              target="_blank"
            >
              Installation Docs
            </KernelHeaderButton>
          </ KernelHeaderButtons>
        </div>
      </KernelHeader>
      <div className="kernel-body">
        <div className="kernel-body-wrapper">{props.children}</div>
      </div>
    </KernelWrapper>
  </Kernel>
);
