// @flow

import Kernel from "./kernel";

export default () => (
  <Kernel
    displayName="Node.JS"
    repository="https://github.com/n-riesco/ijavascript"
    installURL="http://n-riesco.github.io/ijavascript/doc/install.md.html"
  >
    <div>
      <h3>Installation</h3>
      <p>
        Note: nteract 0.1.0 includes a bundled node.js kernel. You likely already have it!
      </p>
      <p>From the terminal:</p>
      <code>
        npm install -g ijavascript
      </code>
    </div>
  </Kernel>
);
