// @flow
import * as React from "react";
import Layout from "@components/layout";
import Python from "@components/kernels/python";
import R from "@components/kernels/r";
import Cplusplus from "@components/kernels/c++";
import Julia from "@components/kernels/julia";
import Node from "@components/kernels/node";
import Scala from "@components/kernels/scala";
import { Hero } from "@components/hero";
import { Type, BashPre } from "@components/typography";
import { ContentSection, ContentSections } from "@components/content-section";
import { PageHeader } from "@components/page-header";
import { Button, Buttons } from "@components/button";
import { CutoffImage } from "@components/cutoff-image";
import { colors } from "@common/colors";
import { withRouter } from "next/router";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/styles/hljs";

type Language = "python" | "node" | "r" | "cplusplus" | "julia" | "scala";

type ViewsType = {| name: string, path: Language |};

const LanguageSlugs: { [string]: Language } = {
  Python: "python",
  Node: "node",
  R: "r",
  CPlusPlus: "cplusplus",
  Julia: "julia",
  Scala: "scala"
};

const VIEWS: Array<ViewsType> = [
  { name: "Python", path: LanguageSlugs.Python },
  { name: "Node.js", path: LanguageSlugs.Node },
  { name: "R", path: LanguageSlugs.R },
  { name: "Julia", path: LanguageSlugs.Julia },
  { name: "C++", path: LanguageSlugs.CPlusPlus },
  { name: "Scala", path: LanguageSlugs.Scala }
];

const RenderContent = ({ view }) => {
  switch (view) {
    case LanguageSlugs.Node:
      return <Node />;
    case LanguageSlugs.R:
      return <R />;
    case LanguageSlugs.CPlusPlus:
      return <Cplusplus />;
    case LanguageSlugs.Julia:
      return <Julia />;
    case LanguageSlugs.Scala:
      return <Scala />;
    default:
      return <Python />;
  }
};

class KernelsPage extends React.Component<
  { slug: ?Language, url: Array<string>, router: * },
  { view: ?string }
> {
  static async getInitialProps(ctx: *) {
    const {
      query: { slug }
    } = ctx;
    return { slug };
  }

  state = {
    view: this.props.slug || LanguageSlugs.Python
  };

  changeView = view => {
    this.setState(state => (state.view !== view ? { ...state, view } : state));
    this.props.router.push(`/kernels/${view}`, `/kernels/${view}`, {
      shallow: true
    });
  };

  activeView = view => view === this.state.view;

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
              {/** use :any to avoid Flow error from this bug: https://github.com/facebook/flow/issues/2221 */}
              {(Object.values(VIEWS): any).map(view => (
                <Button
                  secondary
                  key={view.name}
                  label={view.name}
                  onClick={() => this.changeView(view.path)}
                  active={this.activeView(view.path)}
                />
              ))}
            </Buttons>
          </PageHeader.Left>

          <PageHeader.Right visual padding="40px 0 0 0">
            <CutoffImage
              src="/static/kernels-terminal.png"
              alt="Kernels hero image"
            />
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
