import Head from "next/head";
import { PageHeader } from "../page-header";

const PageHeaderComponent = themeColor => <PageHeader themeColor={themeColor}>
  <PageHeader.Left>
    <PageHeader.Title>Kernels</PageHeader.Title>
    <p>
      Kernels connect your favorite languages to nteract projects for an
      improved REPL experience. nteract looks for installed kernels in
      your local python/pip or conda environment. More detailed instructions 
      for various kernels can be found below.
    </p>
  </PageHeader.Left>
  <PageHeader.Right />
</PageHeader>;

export default PageHeaderComponent;
