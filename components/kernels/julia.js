// @flow
import * as React from "react";
import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const install = `
# From a Julia prompt
using Pkg
Pkg.add("IJulia")`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="Julia"
        repository="https://github.com/JuliaLang/IJulia.jl"
        installURL="https://github.com/JuliaLang/IJulia.jl#installation"
        logo="https://raw.githubusercontent.com/JuliaLang/IJulia.jl/master/deps/ijulialogo.png"
      >
        <h3>Installation</h3>
        <div className="columns">
          <div className="column">
            <p>
              Install Julia to your system. https://julialang.org/downloads/
            </p>
            <h4>Within Julia</h4>
            <SyntaxHighlighter language="julia" style={github}>
              {install}
            </SyntaxHighlighter>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);
