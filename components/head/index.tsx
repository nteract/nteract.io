import React from "react";
import Head from "next/head";

type HeadProps = {
  pageTitle?: string;
  themeColor?: string;
};

const Index = ({
  pageTitle = ":  write your next code-driven story.",
  themeColor = "#334865",
}: HeadProps) => (
  <Head>
    <title>{`nteract${pageTitle}`}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="canonical" href="https://nteract.io/" />
    <link rel="author" href="humans.txt" />

    <link rel="dns-prefetch" href="//nteract.io/" />

    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/icons/apple-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href="/icons/apple-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="/icons/apple-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="/icons/apple-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/icons/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/icons/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/icons/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/icons/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/icons/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/icons/android-icon-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/icons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/icons/favicon-96x96.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/icons/favicon-16x16.png"
    />
    <link rel="manifest" href="/icons/manifest.json" />
    <meta name="msapplication-TileColor" content="#334865" />
    <meta
      name="msapplication-TileImage"
      content="/icons/ms-icon-144x144.png"
    />
    <meta name="theme-color" content="#334865" />
    <link rel="shortcut icon" href="/icons/favicon.ico" />

    <link rel="preconnect" href="https://nteract.io/" />
    <link rel="prefetch" href="https://nteract.io/" />
    <link rel="prerender" href="https://nteract.io/" />

    <meta
      name="description"
      content="nteract is an open source organization committed to building the future of interactive computing."
    />
    <meta name="robots" content="index,follow,noodp" />
    <meta name="googlebot" content="index,follow" />
    <meta name="url" content="https://nteract.io/" />
    <meta name="coverage" content="Worldwide" />
    <meta name="rating" content="General" />
    <meta name="format-detection" content="telephone=no" />

    <meta property="og:url" content="https://nteract.io/" />
    <meta property="og:type" content="website" />
    <meta
      property="og:title"
      content="Take your computing experience to the next level."
    />
    <meta property="og:image" content="/opengraph.png" />
    <meta
      property="og:description"
      content="nteract is a desktop application that allows you to develop rich documents that contain prose, executable code, and images."
    />
    <meta property="og:site_name" content="nteract" />
    <meta property="og:locale" content="en_US" />

    <meta
      name="twitter:card"
      content="Take your computing experience to the next level."
    />
    <meta name="twitter:site" content="@nteract" />
    <meta name="twitter:url" content="https://nteract.io/" />
    <meta name="twitter:title" content="nteract" />
    <meta
      name="twitter:description"
      content="nteract is a desktop application that allows you to develop rich documents that contain prose, executable code, and images."
    />
    <meta name="twitter:image" content="/opengraph.png" />

    <meta name="theme-color" content={themeColor} />
  </Head>
);

export default Index;
