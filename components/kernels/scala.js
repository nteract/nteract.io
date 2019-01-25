// @flow
import * as React from "react";
import Kernel from "./kernel";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";
import { ContentSection } from "../content-section";

const install = `# From a bash prompt
SCALA_VERSION=2.12.8 ALMOND_VERSION=0.2.2
coursier bootstrap \\
    -r jitpack \\
    -i user -I user:sh.almond:scala-kernel-api_$SCALA_VERSION:$ALMOND_VERSION \\
    sh.almond:scala-kernel_$SCALA_VERSION:$ALMOND_VERSION \\
    -o almond
./almond --install
`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="Scala"
        repository="https://github.com/almond-sh/almond"
        installURL="https://almond.sh/docs/quick-start-install"
        logo="/static/scala-spiral.png"
      >
        <h3>Installation</h3>
        <p>
          Install{" "}
          <a href="https://docs.scala-lang.org/getting-started-sbt-track/getting-started-with-scala-and-sbt-on-the-command-line.html">
            Scala
          </a>{" "}
          to your system.
        </p>
        <div className="columns">
          <div className="column">
            <h4>
              From the command line, install the almond (formerly jupyter-scala)
              kernel
            </h4>
            <SyntaxHighlighter language="scala" style={github}>
              {install}
            </SyntaxHighlighter>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);
