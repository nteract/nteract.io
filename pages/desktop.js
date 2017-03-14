// @flow
import Head from "next/head";

type ShowPiece = {
  type: "video" | "image",
  src: string
};

type FeatureProps = {
  title: string,
  showpiece: ShowPiece,
  description: string
};

const Feature = (props: FeatureProps) => (
  <section>
    <h1>{props.title}</h1>
  </section>
);

const OpenNotebooksFeature = () => (
  <section
    style={{
      flexDirection: "row",
      display: "flex"
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        flex: "1 1 50%",
        order: 1
      }}
    >
      <h2>Double Click</h2>
      <p>Open notebooks natively on Mac, Windows, and Linux</p>
    </div>
    <div
      style={{
        flex: "1 1 50%",
        order: 2
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flex: "1"
        }}
      >
        <video
          style={{
            boxShadow: "0 4px 14px 0 rgba(0,0,0,.1)",
            transform: "translateX(50px)"
          }}
          src="/static/double-click-notebook.mp4"
          autoPlay
          loop
        />
      </div>
    </div>
  </section>
);

export default () => (
  <div
    style={{
      margin: "40px"
    }}
  >
    <Head>
      <title>{`The nteract Desktop App`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/static/kernels.css" />
    </Head>
    <h1
      style={{
        textAlign: "center",
        paddingBottom: "50px"
      }}
    >nteract Desktop</h1>
    <OpenNotebooksFeature />
  </div>
);
