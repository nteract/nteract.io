import * as React from "react";
import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const pipInstallLinux = `
python3 -m venv my_environment_name                # create a virtual environment
source my_environment_name/bin/activate            # activate the virtual environment
python3 -m pip install kotlin-jupyter-kernel       # install the Kotlin kernel into the virtual environment
python3 -m kotlin_kernel fix-kernelspec-location   # install Kotlin kernel into nteract's available kernel list`;

const pipInstallWindows = `
python3 -m venv my_environment_name                # create a virtual environment
my_environment_name\\Scripts\\activate             # activate the virtual environment
python3 -m pip install kotlin-jupyter-kernel       # install the Kotlin kernel into the virtual environment
python3 -m kotlin_kernel fix-kernelspec-location   # install Kotlin kernel into nteract's available kernel list`;

const pipGlobalInstall = `
python3 -m pip install kotlin-jupyter-kernel       # install the Kotlin kernel into the virtual environment
python3 -m kotlin_kernel fix-kernelspec-location   # install Kotlin kernel into nteract's available kernel list`;

const condaInstall = `
conda create -n my_conda python=3
conda activate my_conda
conda install -c jetbrains kotlin-jupyter-kernel   # install Kotlin kernel into the conda environment
python -m kotlin_kernel fix-kernelspec-location    # install Kotlin kernel into nteract's available kernel list`;

const sourcesInstall = `
git clone https://github.com/Kotlin/kotlin-jupyter.git
cd kotlin-jupyter
./gradlew install   # run Gradle task that will install Kernel. Python is not needed
`;

const Kotlin = () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="Kotlin"
        repository="https://github.com/Kotlin/kotlin-jupyter"
        installURL="https://github.com/Kotlin/kotlin-jupyter#installation"
        logo="/static/kotlin-icon.svg"
      >
        <h3>Installation</h3>
        <p>Kotlin kernel can be installed with conda, PyPi or from sources.</p>
        <div className="columns">
          <div className="column">
            <h4>Using conda</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {condaInstall}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>
              Using Python3 with pip and a virtual environment on macOS and
              Linux
            </h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pipInstallLinux}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>Using Python3 with pip and a virtual environment on Windows</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pipInstallWindows}
            </SyntaxHighlighter>
          </div>
          <div className="column">
            <h4>From sources globally</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {sourcesInstall}
            </SyntaxHighlighter>
          </div>
        </div>
        <p>
          Alternatively, you may wish to install the Kotlin kernel globally on
          your system. This enables you to use the Kotlin kernel without
          creating a virtual environment.
        </p>
        <div className="columns">
          <div className="column">
            <h4>Using Python3 globally (without a virtual environment)</h4>
            <SyntaxHighlighter language="zsh" style={github}>
              {pipGlobalInstall}
            </SyntaxHighlighter>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);

export default Kotlin;
