import React from "react";
import Link from "next/link";
import styles from "./navigation.scss";

export default () => (
  <div className="nav buttons" role="navigation">
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <a href="https://blog.nteract.io/" target="_blank" className="nav-item">
      Blog
    </a>
    <Link href="/about" as="/about">
      <a className="nav-item">About</a>
    </Link>
  </div>
);
