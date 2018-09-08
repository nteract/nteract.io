// @flow
import * as React from "react";

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import {
  ContentSection,
} from "../content-section";

const pipInstall = `python -m pip install ipykernel virtualenv
python -m ipykernel install
python -m virtualenv myenv
source myenv/bin/activate
pip install ipykernel
pip install -r requirements.txt
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"`;

const condaInstall = `conda install ipykernel
python -m ipykernel install
conda env create -f environment.yml
source activate myenv
conda install ipykernel
python -m ipykernel install --user --name myenv --display-name "Python (myenv)"`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="Python"
        repository="https://github.com/ipython/ipykernel"
        installURL="http://ipython.readthedocs.io/en/stable/install/kernel_install.html"
        logo="/static/python.png"
      >
        <h3>Installation</h3>
        <p>
          Python environments are added as kernels with ipykernel. Install
          ipykernel into your environment to add it to
          your list of kernels.
        </p>
        <div className="columns">
          <div className="column">
            <h4>Using pip</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pipInstall}
            </SyntaxHighlighter>
          </div>
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
