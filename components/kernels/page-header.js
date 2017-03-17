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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus ipsum officia pariatur rem. Ea et explicabo recusandae?
        Aperiam dolore, exercitationem in laudantium maiores perferendis, qui, quo sit tempore voluptatem voluptatum.
      </p>
    </PageHeaderLeft>
    <PageHeaderRight />
  </PageHeader>
);
