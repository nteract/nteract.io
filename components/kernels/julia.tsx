import * as React from "react";
import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const install = `# From a Julia prompt
julia> using Pkg
julia> Pkg.add("IJulia")`;

const updateKernel = `# From a Julia prompt
julia> using Pkg
julia> Pkg.update("IJulia")
julia> using IJulia
julia> IJulia.installkernel("Julia nteract")`;

const Julia = () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="Julia"
        repository="https://github.com/JuliaLang/IJulia.jl"
        installURL="https://julialang.github.io/IJulia.jl/dev/manual/installation/"
        logo="https://raw.githubusercontent.com/JuliaLang/IJulia.jl/master/deps/ijulialogo.png"
      >
        <h3>Installation</h3>
        <div className="columns">
          <div className="column">
            <p>
              Install <a href="https://julialang.org/downloads/">Julia</a> to
              your system.
            </p>
            <h4>To install the IJulia kernel</h4>
            <SyntaxHighlighter language="julia" style={github}>
              {install}
            </SyntaxHighlighter>
            <h4>To update and reinstall the IJulia kernel</h4>
            <p>
              Perform the same steps as installing the IJulia and perform the
              update and install kernel steps.
            </p>
            <SyntaxHighlighter language="julia" style={github}>
              {updateKernel}
            </SyntaxHighlighter>
            <p>
              Refer to the{" "}
              <a href="https://julialang.github.io/IJulia.jl/dev/">
                IJulia documentation
              </a>{" "}
              for additional commands.
            </p>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);

export default Julia;
