// @flow
import React from "react";
import Link from "next/link";

export default () => (
  <div className="nav buttons">
    <Link as="/desktop" href="/desktop" prefetch>
      <a className="nav-item">Desktop</a>
    </Link>
    <Link as="/atom" href="/atom" prefetch>
      <a className="nav-item">Atom</a>
    </Link>
    <Link as="/kernels" href="/kernels" prefetch>
      <a className="nav-item">Kernels</a>
    </Link>
  </div>
);
