// @flow
import * as React from "react";

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const pipInstall = `python3 -m venv my_environment_name  # create a virtual environment
source my_environment_name/bin/activate  # activate the virtual environment
python -m pip install ipykernel  # install the python kernel (ipykernel) into the virtual environment
python -m ipykernel install  # install python kernel into nteract's available kernel list`;

const pip2Install = `python -m pip install virtualenv  # install a package for creating virtual environment
cd my_project_folder  # create a project folder
virtualenv my_project  # create a virtual environment
source my_project/bin/activate  # activate the virtual environment
python -m pip install ipykernel  # install the python kernel (ipykernel) into the virtual environment
python -m ipykernel install # install python kernel into nteract's available kernel list`;

const pipGlobalInstall = `python3 -m pip install ipykernel  # install the python kernel (ipykernel) globally
python3 -m ipykernel install  # install python kernel into nteract's available kernel list`;

const pip2Install = `python -m pip install ipykernel  # install the python kernel (ipykernel) globally
python -m ipykernel install # install python kernel into nteract's available kernel list`;

const condaInstall = `conda create -n my_conda python=3   # Or python=2 for Python 2
source activate my_conda    # On Windows, remove the word 'source'
conda install ipykernel  # install Python kernel (ipykernel) into the conda environment
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
          To use Python in nteract, a Python kernel, ipykernel, is added to an
          environment, such as a virtual environment or conda environment.
          Installing ipykernel into your environment will add Python to your
          available kernels' list in nteract.
        </p>
        <div className="columns">
          <div className="column">
            <h4>Using conda</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {condaInstall}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>Using Python3 with pip and a virtual environment</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pipInstall}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>Using Python 2 with pip and a virtual environment</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pip2Install}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>Using Python3 globally (without a virtual environment)</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pipGlobalInstall}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>Using Python 2 globally (without a virtual environment)</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pip2GlobalInstall}
            </SyntaxHighlighter>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);
