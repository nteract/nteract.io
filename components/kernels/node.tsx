import * as React from "react";

import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";
import kernels from "../../pages/kernels";

const install = `
npm install -g ijavascript
ijsinstall`;

const Node = () => (
  <ContentSection>
    <ContentSection.Pane $full>
      <Kernel
        displayName="Node.JS"
        repository="https://github.com/n-riesco/ijavascript"
        installURL="http://n-riesco.github.io/ijavascript/doc/install.md.html"
        logo="/nodejs-icon.svg"
      >
        <h3>Installation</h3>
        <p>
          nteract includes a bundled Node.js kernel. You may begin working with
          it after starting the nteract app.
        </p>
        <div className="columns">
          <div className="column">
            <h4>Use nteract's node.js kernel</h4>
            <p>
              From the nteract app's Runtime menu, select the Node nteract
              kernel. You should see an indicator in the bottom left that
              displays the kernel as node.
            </p>
            <h4>Installing the ijavascript kernel</h4>
            <p>
              If you wish to explore another Javascript kernel, you may install
              ijavascript from the terminal.
            </p>
            <SyntaxHighlighter language="zsh" style={github}>
              {install}
            </SyntaxHighlighter>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);

export default Node;
