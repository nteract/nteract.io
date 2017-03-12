// @flow

export type KernelProps = {
  displayName: string,
  installURL: string,
  repository: string,
  children?: any // It's React$Element<*>, running into https://github.com/facebook/flow/issues/1964 though
};

export default (props: KernelProps) => (
  <div className="kernel">
    <section>
      <h2>{props.displayName}</h2>
      <style jsx>
        {
          `
        p {
          margin-left: 10px;
        }
      `
        }
      </style>
      <p><a href={props.repository}>GitHub repository</a></p>
      <p><a href={props.installURL}>Install</a></p>
    </section>
    {props.children}
  </div>
);
