// @flow
import * as React from "react";
import Layout from "@components/layout";
import Python from "@components/kernels/python";
import R from "@components/kernels/r";
import Cplusplus from "@components/kernels/c++";
import Julia from "@components/kernels/julia";
import Node from "@components/kernels/node";
import Scala from "@components/kernels/scala";
import Dotnet from "@components/kernels/dotnet";
import Kotlin from "@components/kernels/kotlin";
import { Type } from "@components/typography";
import { ContentSections } from "@components/content-section";
import { PageHeader } from "@components/page-header";
import { Button, Buttons } from "@components/button";
import { colors } from "@common/colors";
import { withRouter } from "next/router";

type Language = "python" | "node" | "r" | "cplusplus" | "julia" | "scala" | "dotnet" | "kotlin";

type ViewsType = {| name: string, path: Language |};

const LanguageSlugs: { [string]: Language } = {
  Python: "python",
  Node: "node",
  R: "r",
  CPlusPlus: "cplusplus",
  Julia: "julia",
  Scala: "scala",
  Dotnet: "dotnet",
  Kotlin: "kotlin"
};

const VIEWS: Array<ViewsType> = [
  { name: "Python", path: LanguageSlugs.Python },
  { name: "Node.js", path: LanguageSlugs.Node },
  { name: "R", path: LanguageSlugs.R },
  { name: "Julia", path: LanguageSlugs.Julia },
  { name: "C++", path: LanguageSlugs.CPlusPlus },
  { name: "Scala", path: LanguageSlugs.Scala },
  { name: ".NET", path: LanguageSlugs.Dotnet },
  { name: "Kotlin", path: LanguageSlugs.Kotlin }
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
    case LanguageSlugs.Dotnet:
        return <Dotnet />;
    case LanguageSlugs.Kotlin:
      return <Kotlin />;
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
        </PageHeader>
        <ContentSections>
          <RenderContent view={this.state.view} />
        </ContentSections>
      </Layout>
    );
  }
}

export default withRouter(KernelsPage);
