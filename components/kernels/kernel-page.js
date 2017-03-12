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
      <style>
        {
          `
  code {
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  body {
    font-family: -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  }
`
        }
      </style>
    </Head>
    <LanguageToggle current={props.language} kernels={kernels} />
    <props.Kernel />
  </div>
);
