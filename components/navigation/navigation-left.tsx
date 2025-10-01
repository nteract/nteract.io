import * as React from "react";
import Link from "next/link";

const NavigationLeft = () => (
  <div className="nav buttons" role="navigation">
    <a href="https://blog.nteract.io/" target="_blank" className="nav-item">
      Blog
    </a>
    <Link href="/about" as="/about" className="nav-item">
      About
    </Link>
    <a
      href="https://github.com/nteract/nteract/issues/new/choose"
      target="_blank"
      className="nav-item"
    >
      Feedback
    </a>
  </div>
);

export default NavigationLeft;
