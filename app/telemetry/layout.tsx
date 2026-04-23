import type { Metadata } from "next";
import type { ReactNode } from "react";

import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Telemetry",
  description:
    "A light ping, and why we ask. What nteract sends, what it never sends, and how to opt out.",
  openGraph: {
    title: "Telemetry | " + siteConfig.name,
    description:
      "A light ping, and why we ask. What nteract sends, what it never sends, and how to opt out.",
    url: absoluteUrl("/telemetry"),
    type: "article",
  },
};

export default function TelemetryLayout({ children }: { children: ReactNode }) {
  return children;
}
