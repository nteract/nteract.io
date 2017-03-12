// @flow

type KernelProps = {
  name: string,
  installURL: string,
  repository: string,
  installComponent: () => React$Element<*>,
}

const Kernel = (props: KernelProps) => (
  <section key={props.name}>
    <h2>{props.name}</h2>
    <p><a href={props.repository}>GitHub repository</a></p>
    <p><a href={props.installURL}>Install</a></p>
    { props.installComponent ? <props.installComponent /> : null }
  </section>
);

const kernels = [
  {
    name: "Python",
    installURL: "http://ipython.readthedocs.io/en/stable/install/kernel_install.html",
    repository: "https://github.com/ipython/ipykernel",
    installComponent: () => (
      <div>
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
    )
  },
  {
    name: "R",
    installURL: "https://irkernel.github.io/installation/",
    repository: "https://github.com/IRkernel/IRkernel",
    installComponent: () => (
      <div>
        <p>Within R:</p>
        <code>
          install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'))
          devtools::install_github('IRkernel/IRkernel')
          IRkernel::installspec()
        </code>
      </div>
    )
  },
  {
    name: "Node.JS / JavaScript",
    installURL: "http://n-riesco.github.io/ijavascript/doc/install.md.html/",
    repository: "https://github.com/n-riesco/ijavascript",
    installComponent: () => (
      <div>
        <p>Note: nteract 0.1.0 includes a bundled node.js kernel. You likely already have it!</p>
        <p>From the terminal:</p>
        <code>
          npm install -g ijavascript
        </code>
      </div>
    )
  }
];

export default () => (
  <div>
    {
      kernels.map(Kernel)
    }
  </div>
);
