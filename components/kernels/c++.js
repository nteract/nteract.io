// @flow
import * as React from "react";

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import {
  ContentSection,
  ContentSectionPane
} from "../content-section/content-section";



const condaInstall = `conda create -n cling
source activate cling
conda install xeus-cling notebook -c QuantStack -c conda-forge
python -m ipykernel install --user --name myenv --display-name "C++ (cling)"`;

export default () => (
  <ContentSection>
    <ContentSectionPane full>
      <Kernel
        displayName="C++"
        repository="https://github.com/QuantStack/xeus-cling"
        installURL="https://github.com/QuantStack/xeus-cling#installation"
        logo="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/200px-ISO_C%2B%2B_Logo.svg.png"
      >
        <h3>Installation</h3>
        <p>
          The C++ kernel xeus-cling is installed with conda and added with ipykernel.
          your list of kernels.
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
    </ContentSectionPane>
  </ContentSection>
);
