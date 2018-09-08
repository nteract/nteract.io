import Head from "next/head";
import {
  PageHeader,
} from "../page-header";

export default themeColor => (
  <PageHeader themeColor={themeColor}>
    <PageHeader.Left>
      <PageHeader.Title>Kernels</PageHeader.Title>
      <p>
        Kernels connect your favorite languages to nteract projects for an
        improved REPL experience.
      </p>
    </PageHeader.Left>
    <PageHeader.Right />
  </PageHeader>
);
