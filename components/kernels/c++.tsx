import * as React from "react";
import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const condaInstall = `conda install -c conda-forge xeus-cling`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="C++"
        repository="https://github.com/QuantStack/xeus-cling"
        installURL="https://xeus-cling.readthedocs.io/en/latest/installation.html"
        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/200px-ISO_C%2B%2B_Logo.svg.png"
      >
        <h3>Installation</h3>
        <p>
          The C++ kernel, xeus-cling, is installed with conda and uses
          conda-forge as the package source. Installing using conda will also
          install the kernelspec by default. The kernelspec provides nteract
          information about the xeus-kernel needed for its use.
        </p>
        <div className="columns">
          <div className="column">
            <h4>Using conda</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {condaInstall}
            </SyntaxHighlighter>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);
