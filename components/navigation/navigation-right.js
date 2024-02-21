// @flow
import * as React from "react";
import Link from "next/link";

const NavigationRight = () => <div className="nav buttons">
  <Link as="/sdk" href="/sdk" prefetch>
    <a className="nav-item">core SDK</a>
  </Link>
  <Link as="/applications" href="/applications" prefetch>
    <a className="nav-item">Applications</a>
  </Link>
  <Link as="/libraries" href="/libraries" prefetch>
    <a className="nav-item">Libraries</a>
  </Link>
  <a className="nav-item" href="https://numfocus.org/donate-to-nteract">
    Donate
  </a>
</div>;

export default NavigationRight;
