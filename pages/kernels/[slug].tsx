import * as React from "react";
import { useRouter } from "next/router";
import type { GetStaticProps, GetStaticPaths } from "next";
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

type Language =
  | "python"
  | "node"
  | "r"
  | "cplusplus"
  | "julia"
  | "scala"
  | "dotnet"
  | "kotlin";

type ViewsType = { name: string; path: Language };

const LanguageSlugs: { [key: string]: Language } = {
  Python: "python",
  Node: "node",
  R: "r",
  CPlusPlus: "cplusplus",
  Julia: "julia",
  Scala: "scala",
  Dotnet: "dotnet",
  Kotlin: "kotlin",
};

const VIEWS: Array<ViewsType> = [
  { name: "Python", path: LanguageSlugs.Python },
  { name: "Node.js", path: LanguageSlugs.Node },
  { name: "R", path: LanguageSlugs.R },
  { name: "Julia", path: LanguageSlugs.Julia },
  { name: "C++", path: LanguageSlugs.CPlusPlus },
  { name: "Scala", path: LanguageSlugs.Scala },
  { name: ".NET", path: LanguageSlugs.Dotnet },
  { name: "Kotlin", path: LanguageSlugs.Kotlin },
];

const RenderContent = ({ view }: { view: Language }) => {
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

interface KernelsPageProps {
  slug: Language;
}

const KernelsPage: React.FC<KernelsPageProps> = ({ slug }) => {
  const router = useRouter();
  const [view, setView] = React.useState<Language>(slug);

  const changeView = (newView: Language) => {
    setView(newView);
    router.push(`/kernels/${newView}`, undefined, { shallow: true });
  };

  const activeView = (checkView: Language) => checkView === view;

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
            {VIEWS.map((viewItem) => (
              <Button
                secondary
                key={viewItem.name}
                label={viewItem.name}
                onClick={() => changeView(viewItem.path)}
                active={activeView(viewItem.path)}
              />
            ))}
          </Buttons>
        </PageHeader.Left>
      </PageHeader>
      <ContentSections>
        <RenderContent view={view} />
      </ContentSections>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = VIEWS.map((view) => ({
    params: { slug: view.path },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<KernelsPageProps> = async ({ params }) => {
  const slug = (params?.slug as Language) || "python";

  return {
    props: {
      slug,
    },
  };
};

export default KernelsPage;
