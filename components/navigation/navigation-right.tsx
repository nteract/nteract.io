import * as React from "react";
import Link from "next/link";

const NavigationRight = () => (
  <div className="nav buttons">
    <Link as="/sdk" href="/sdk" prefetch className="nav-item">
      core SDK
    </Link>
    <Link as="/applications" href="/applications" prefetch className="nav-item">
      Applications
    </Link>
    <Link as="/libraries" href="/libraries" prefetch className="nav-item">
      Libraries
    </Link>
    <a className="nav-item" href="https://numfocus.org/donate-to-nteract">
      Donate
    </a>
  </div>
);

export default NavigationRight;
