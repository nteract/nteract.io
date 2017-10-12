// @flow

export type KernelProps = {
  displayName: string,
  installURL: string,
  repository: string,
  logo: string,
  children?: any // It's React$Element<*>, running into https://github.com/facebook/flow/issues/1964 though
};

export default (props: KernelProps) => (
  <div className="kernel">
    <div className="kernel-wrapper">
      <div className="kernel-header">
        <div className="kernel-header-section">
          <h2>
            <div className="lang-logo">
              <img src={props.logo} alt={props.displayName} />
            </div>
            {props.displayName}
          </h2>
        </div>
        <div className="kernel-header-section">
          <div className="kernel-header-buttons">
            <a
              className="kernel-header-button"
              href={props.repository}
              target="_blank"
            >
              GitHub Repository
            </a>{" "}
            <a
              className="kernel-header-button"
              href={props.installURL}
              target="_blank"
            >
              Installation Docs
            </a>
          </div>
        </div>
      </div>
      <div className="kernel-body">
        <div className="kernel-body-wrapper">{props.children}</div>
      </div>
    </div>
  </div>
);
