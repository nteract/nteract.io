// @flow
import * as React from "react";
import Link from "next/link";
// $FlowFixMe
import styles from "./navigation.scss";

const NavigationLeft = () => <div className="nav buttons" role="navigation">
  <style dangerouslySetInnerHTML={{ __html: styles }} />
  <a href="https://blog.nteract.io/" target="_blank" className="nav-item">
    Blog
  </a>
  <Link href="/about" as="/about">
    <a className="nav-item">About</a>
  </Link>
  <a
    href="https://github.com/nteract/nteract/issues/new/choose"
    target="_blank"
    className="nav-item"
  >
    Feedback
  </a>
</div>;

export default NavigationLeft;
