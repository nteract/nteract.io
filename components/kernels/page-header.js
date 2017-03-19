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
        Kernels power your favorite languages within nteract projects and across
        the Jupyter ecosystem.
      </p>
    </PageHeaderLeft>
    <PageHeaderRight />
  </PageHeader>
);
