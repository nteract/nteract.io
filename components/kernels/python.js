// @flow

import Kernel from "./kernel";

export default () => (
  <Kernel
    displayName="Python"
    repository="https://github.com/ipython/ipykernel"
    installURL="http://ipython.readthedocs.io/en/stable/install/kernel_install.html"
  >
    <div>
      <h3>Installation</h3>
      <p>pip based:</p>
      <code>
        python -m pip install ipykernel
        python -m ipykernel install --user
      </code>
      <p>using conda:</p>
      <code>
        conda install ipykernel
        python -m ipykernel install --user
      </code>
    </div>
  </Kernel>
);
