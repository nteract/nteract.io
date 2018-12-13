// @flow
import * as React from "react";

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const pipInstall = `python3 -m venv my_environment_name
source my_environment_name/bin/activate
python -m pip install ipykernel
python -m ipykernel install`;

const pip2Install = `python -m pip install virtualenv
cd my_project_folder
virtualenv my_project
source my_project/bin/activate
python -m pip install ipykernel
python -m ipykernel install`;

const condaInstall = `conda create -n my_conda python=3   # Or python=2 for Python 2
source activate my_conda    # On Windows, remove the word 'source'
conda install ipykernel
python -m ipykernel install`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="Python"
        repository="https://github.com/ipython/ipykernel"
        installURL="http://ipython.readthedocs.io/en/stable/install/kernel_install.html"
        logo="/static/python.svg"
      >
        <h3>Installation</h3>
        <p>
          To use Python in nteract, a Python kernel, ipykernel, is added to
          an environment, such as a virtual environment or conda environment.
          Installing ipykernel into your environment will add Python to your
          list of kernels.
        </p>
        <div className="columns">
          <div className="column">
            <h4>Using pip and Python 3</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pipInstall}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>Using pip and Python 2</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pip2Install}
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
