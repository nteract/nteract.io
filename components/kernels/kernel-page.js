// @flow
import Head from "next/head";
import LanguageToggle from "../../components/kernels/language-toggle";

export type KernelPageProps = {
  language: string,
  Kernel: any
};

export const kernels = [
  { name: "python", path: "/kernels/python" },
  { name: "r", path: "/kernels/r" },
  { name: "node.js", path: "/kernels/node" }
];

export default (props: KernelPageProps) => (
  <div>
    <Head>
      <title>{`kernels - ${props.language}`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/static/kernels.css" />
    </Head>
    <header>
      <LanguageToggle current={props.language} kernels={kernels} />
    </header>
    <props.Kernel />
  </div>
);
