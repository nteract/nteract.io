// @flow
import {
  PageHeader,
  PageHeaderLeft,
  PageHeaderRight
} from "../../components/page-header/page-header";

import { DownloadFeaturette } from "../../components/download-buttons";

export default () => (
  <PageHeader color="#244d64">
    <PageHeaderLeft>
      <h1>
        Notebooks on your desktop
      </h1>

      <p>
        Write code, prose, and embed interactive plots to tell powerful narratives.
        Explore computing creatively. All the power of Jupyter notebooks,
        wrapped in native desktop goodness.
      </p>

      <div className="mobile-only hero-mobile-message">
        <h4>Connect with us</h4>
      </div>

      <DownloadFeaturette platform="macOS" />

    </PageHeaderLeft>
    <PageHeaderRight>
      <img
        src="https://cloud.githubusercontent.com/assets/836375/18421299/d95ad398-783b-11e6-8b23-d54cf7caad1e.png"
        alt=""
        className="cutoff-image"
      />
    </PageHeaderRight>
  </PageHeader>
);
