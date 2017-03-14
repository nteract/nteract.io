import React from "react";
import Link from "next/link";
import styles from "./navigation.scss";

export default () => (
  <div className="nav buttons" role="navigation">
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <a href="https://medium.com/nteract" target="_blank" className="nav-item">
      Blog
    </a>
    <a href="https://medium.com/nteract" target="_blank" className="nav-item">
      About
    </a>
  </div>
);
