import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nteract",
  description:
    "native interactive notebooks — fast to launch, agent ready, humans welcome.",
  metadataBase: new URL("https://nteract.io"),
  openGraph: {
    title: "nteract",
    description:
      "native interactive notebooks — fast to launch, agent ready, humans welcome.",
    url: "https://nteract.io",
    siteName: "nteract",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "nteract",
    description:
      "native interactive notebooks — fast to launch, agent ready, humans welcome.",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
