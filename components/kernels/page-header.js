import Head from "next/head";
import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderLeft,
  PageHeaderRight
} from "../page-header/page-header";

export default () => (
  <PageHeader color="#353a79">
    <PageHeaderLeft>
      <PageHeaderTitle>Kernels</PageHeaderTitle>
      <p>
        Kernels connect your favorite languages to nteract projects for an improved
        REPL experience.
      </p>
    </PageHeaderLeft>
    <PageHeaderRight />
  </PageHeader>
);
