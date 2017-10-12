// @flow

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/styles";
import {
  ContentSection,
  ContentSectionPane
} from "../content-section/content-section";

const pipInstall = `python -m pip install ipykernel
python -m ipykernel install --user`;

const condaInstall = `conda install ipykernel
python -m ipykernel install --user`;

export default () => (
  <ContentSection>
    <ContentSectionPane full>
      <Kernel
        displayName="Python"
        repository="https://github.com/ipython/ipykernel"
        installURL="http://ipython.readthedocs.io/en/stable/install/kernel_install.html"
        logo="/static/python.png"
      >
        <h3>Installation</h3>
        <div className="columns">
          <div className="column">
            <h4>pip based</h4>
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
    </ContentSectionPane>
  </ContentSection>
);
