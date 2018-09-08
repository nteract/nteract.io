// @flow
import * as React from 'react';

import Kernel from './kernel';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';
import {
  ContentSection
} from '../content-section';

const install = `install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'))
devtools::install_github('IRkernel/IRkernel')
IRkernel::installspec()`;

export default () => (
  <ContentSection>
    <ContentSection.Pane full>
      <Kernel
        displayName="R"
        repository="https://github.com/IRkernel/IRkernel"
        installURL="https://irkernel.github.io/installation/"
        logo="/static/r.png"
      >
        <h3>Installation</h3>
        <div className="columns">
          <div className="column">
            <h4>Within R</h4>
            <SyntaxHighlighter language="r" style={github}>
              {install}
            </SyntaxHighlighter>
          </div>
        </div>
      </Kernel>
    </ContentSection.Pane>
  </ContentSection>
);
