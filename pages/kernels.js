// @flow
import * as React from 'react';
import  Layout from '@components/layout';
import { Hero } from '@components/hero';
import { Type, BashPre } from '@components/typography';
import { ContentSection, ContentSections } from '@components/content-section';
import { PageHeader } from '@components/page-header';
import { Button, Buttons } from '@components/button';
import { colors } from '@common/constants';
import { withRouter } from 'next/router';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';


type Languages = 'python' | 'node' | 'r';

type Slugs = 'kernels/python' | 'kernels/node' | 'kernels/r';
type ViewsType = { [key: ?Languages]: Slugs };

const VIEWS: ViewsType = {
  python: 'kernels/python',
  node: 'kernels/node',
  r: 'kernels/r',
};

const rCode = `install.packages(c('repr', 'IRdisplay', 'evaluate', 'crayon', 'pbdZMQ', 'devtools', 'uuid', 'digest'))
devtools::install_github('IRkernel/IRkernel')
IRkernel::installspec()`;



const RenderContent = ({ view }) => {
  switch (view) {
    case VIEWS.node:
      return (
        <ContentSection>
          <ContentSection.Pane>
            <ContentSection.Title kernel>
              <ContentSection.Title.Section>
                <img src="/static/nodejs-icon.svg" />Node.js Installation
              </ContentSection.Title.Section>
            </ContentSection.Title>
            <Type.p>
              Note: nteract 0.1.0 includes a bundled node.js kernel. You likely
              already have it!
            </Type.p>
            <Type.h4 padding="20px 0 0 0">From the terminal</Type.h4>
            <BashPre>
              <code>npm install -g ijavascript</code>
            </BashPre>
          </ContentSection.Pane>
        </ContentSection>
      );
    case VIEWS.r:
      return (
        <ContentSection>
          <ContentSection.Pane full>
            <ContentSection.Title kernel>
              <ContentSection.Title.Section>
                <img src="/static/r.png" />R Installation
              </ContentSection.Title.Section>
            </ContentSection.Title>
            <Type.h4 padding="10px 0 0 0">Within R</Type.h4>
            <SyntaxHighlighter language="r" style={github}>
              {rCode}
            </SyntaxHighlighter>
          </ContentSection.Pane>
        </ContentSection>
      );
    default:
      return (
        <ContentSection>
          <ContentSection.Pane>
            <ContentSection.Title kernel>
              <ContentSection.Title.Section>
                <img src="/static/python.png" />
              </ContentSection.Title.Section>
            </ContentSection.Title>

              <Type.h3> Installation</Type.h3>
              <Type.h4 padding="10px 0 0 0">pip based</Type.h4>
              <BashPre>
                <code>python -m pip install ipykernel
                      python -m ipykernel install --user</code>
              </BashPre>
              <Type.h4 padding="100px 0 0 0">Using Conda</Type.h4>
            <BashPre>
              <code>
                conda install ipykernel\n
                python -m ipykernel install --user
              </code>
            </BashPre>
          </ContentSection.Pane>
        </ContentSection>
      );
  }
};

class KernelsPage extends React.Component<{ slug: ?Languages, url: Array<string> }, { view: ?string}> {
  static async getInitialProps(ctx: *) {
    const {
      query: { slug },
    } = ctx;
    return { slug };
  }

  state = {
    view: VIEWS[this.props.slug] || VIEWS.python,
  };

  changeView = (view) => {
    this.setState(
      (state) => (state.view !== view ? { ...state, view } : state),
    );
    this.props.router.push(`/${view}`, `/${view}`);
  };

  activeView = (view) => view === this.state.view;

  render() {
    return (
      <Layout>
        <PageHeader themeColor="rgb(44, 31, 57)">
          <PageHeader.Left>         
            <PageHeader.Title>Kernels</PageHeader.Title>
            <Type.p color={colors.lightGrayColor}>
              Kernels connect your favorite languages to nteract projects for an
              improved REPL experience.
            </Type.p>
            <Buttons padding="20px 0 0 0">
              <Button
                secondary
                label="Python"
                onClick={() => this.changeView(VIEWS.python)}
                active={this.activeView(VIEWS.python)}
              />
              <Button
                secondary
                label="Node.js"
                onClick={() => this.changeView(VIEWS.node)}
                active={this.activeView(VIEWS.node)}
              />
              <Button
                secondary
                label="R"
                onClick={() => this.changeView(VIEWS.r)}
                active={this.activeView(VIEWS.r)}
              />
            </Buttons>
          </PageHeader.Left>

          <PageHeader.Right visual padding="40px 0 0 0">
            <img src="/static/kernels-terminal.png" alt="Kernels hero image" />
          </PageHeader.Right>
        </PageHeader>
        <ContentSections>
          <RenderContent view={this.state.view} />
        </ContentSections>
      </Layout>
    );
  }
}

export default withRouter(KernelsPage);
