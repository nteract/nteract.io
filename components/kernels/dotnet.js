// @flow
import * as React from "react";

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const install = `dotnet tool install -g dotnet-interactive`;
const installKernelSpecs = `dotnet interactive jupyter install`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName=".Net Interactive"
        repository="https://github.com/dotnet/try"
        installURL="https://github.com/dotnet/try/blob/master/NotebooksLocalExperience.md"
        logo="/static/dotnet-icon.png"
      >
        <h3>Installation</h3>
        <p>
        Install <a href="https://dotnet.microsoft.com/download">.Net Core sdk</a> to
              your system.
        </p>
        <div className="columns">
          <div className="column">
            <h4>With .Net Core sdk 3.0 installed, from the terminal install the global tool</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {install}
            </SyntaxHighlighter>
            <h4>Now from a the terminal install the kernel specs</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {installKernelSpecs}
            </SyntaxHighlighter>
            C# and F# langauges are now available
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);
