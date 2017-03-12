// @flow

import Kernel from "./kernel";

const installationLines = `install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'))
devtools::install_github('IRkernel/IRkernel')
IRkernel::installspec()`;

export default () => (
  <Kernel
    displayName="R"
    repository="https://github.com/IRkernel/IRkernel"
    installURL="https://irkernel.github.io/installation/"
  >
    <div>
      <h3>Installation</h3>
      <div>
        <p>Within R:</p>
        <code>
          {installationLines}
        </code>
      </div>
    </div>
  </Kernel>
);
