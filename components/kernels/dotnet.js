// @flow
import * as React from "react";

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const install = `dotnet tool install -g Microsoft.dotnet-interactive`;
const installKernelSpecs = `dotnet interactive jupyter install`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName=".NET Interactive"
        repository="https://github.com/dotnet/interactive"
        installURL="https://github.com/dotnet/interactive/blob/master/README.md"
        logo="/static/dotnet-icon.png"
      >
        <h3>Installation</h3>
        <p>
        Install <a href="https://dotnet.microsoft.com/download">.NET Core SDK</a> to
              your system.
        </p>
        <div className="columns">
          <div className="column">
            <h4>First, install the .NET Core SDK 3.1. Then use the command line tool to install the global tool.</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {install}
            </SyntaxHighlighter>
            <h4> Install the .NET interactive kernel from the command line.</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {installKernelSpecs}
            </SyntaxHighlighter>
            The .NET kernel supports C#, F# and Powershell languages
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);
