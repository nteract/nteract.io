// @flow
import React from "react";
import Link from "next/link";

export default () => (
  <div className="nav buttons">
    <a
      href="https://atom.io/packages/hydrogen"
      target="_blank"
      className="nav-item"
    >
      Atom
    </a>
    <Link as="/kernels" href="/kernels" prefetch>
      <a className="nav-item">Kernels</a>
    </Link>
    <Link as="/desktop" href="/desktop" prefetch>
      <a className="nav-item">
        Desktop
      </a>
    </Link>
  </div>
);
