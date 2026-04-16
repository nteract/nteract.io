import { LightboxImage } from "./lightbox-image";

export function IframeIsolationDiagram() {
  return (
    <div className="not-prose my-12 flex justify-center">
      <LightboxImage
        src="/iframe-isolation.svg"
        alt="Diagram showing iframe isolation: parent window with Tauri APIs separated from an isolated blob: iframe by an opaque-origin boundary, with postMessage / JSON-RPC 2.0 as the only bridge."
        className="w-full max-w-[700px]"
      />
    </div>
  );
}
