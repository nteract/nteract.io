"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

export function NotFoundTracker() {
  useEffect(() => {
    track("not-found", {
      path: window.location.pathname,
      referrer: document.referrer || "direct",
    });
  }, []);
  return null;
}
