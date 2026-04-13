/**
 * Diagram showing iframe isolation architecture.
 * Parent window (with Tauri APIs) separated from isolated iframe (blob: origin)
 * by an opaque origin boundary, with postMessage bridge for widgets.
 */
export function IframeIsolationDiagram() {
  return (
    <div className="not-prose my-12 flex justify-center">
      <svg
        width="700"
        height="320"
        viewBox="0 0 700 320"
        fill="none"
        className="w-full max-w-[700px]"
      >
        <title>Diagram showing iframe isolation: parent window with Tauri APIs separated from isolated iframe by an opaque origin boundary</title>
        <style>{`
          .iso-label { fill: #e5e5e5; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 13px; font-weight: 600; }
          .iso-sublabel { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
          .iso-item { fill: #a993d1; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .iso-denied { fill: #ef4444; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .iso-check { fill: #22c55e; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .iso-box { fill: none; stroke: #a993d1; stroke-width: 1.5; rx: 6; }
          .iso-box-fill { fill: #a993d1; opacity: 0.05; rx: 6; }
          .iso-barrier { stroke: #ef4444; stroke-width: 2; stroke-dasharray: 6 4; opacity: 0.6; }
          .iso-barrier-label { fill: #ef4444; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.05em; opacity: 0.8; }
          .iso-arrow { stroke: #a993d1; stroke-width: 1.5; marker-end: url(#iso-arrowhead); opacity: 0.6; }
          .iso-arrow-label { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 8px; letter-spacing: 0.1em; }
          @keyframes iso-pulse { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.35; } }
          .iso-glow { animation: iso-pulse 3s ease-in-out infinite; }
        `}</style>

        <defs>
          <marker id="iso-arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M 0 0 L 8 3 L 0 6" fill="none" stroke="#a993d1" strokeWidth="1" />
          </marker>
        </defs>

        {/* ── Parent Window ── */}
        <rect x="20" y="20" width="280" height="280" className="iso-box-fill" />
        <rect x="20" y="20" width="280" height="280" className="iso-box" />
        <rect x="20" y="20" width="280" height="280" className="iso-box iso-glow" style={{ stroke: "#a993d1", strokeWidth: 1 }} />
        <text x="160" y="50" textAnchor="middle" className="iso-label">Parent Window</text>
        <text x="160" y="65" textAnchor="middle" className="iso-sublabel">tauri://localhost</text>

        {/* Parent capabilities */}
        <text x="50" y="100" className="iso-item">✓ window.__TAURI__</text>
        <text x="50" y="120" className="iso-item">✓ filesystem APIs</text>
        <text x="50" y="140" className="iso-item">✓ shell commands</text>
        <text x="50" y="160" className="iso-item">✓ localStorage</text>
        <text x="50" y="180" className="iso-item">✓ DOM access</text>
        <text x="50" y="200" className="iso-item">✓ WidgetStore</text>
        <text x="50" y="220" className="iso-item">✓ CommBridgeManager</text>

        {/* ── Origin Boundary ── */}
        <line x1="350" y1="10" x2="350" y2="310" className="iso-barrier" />
        <text x="350" y="308" textAnchor="middle" className="iso-barrier-label">ORIGIN BOUNDARY</text>

        {/* ── postMessage arrow ── */}
        <line x1="300" y1="240" x2="400" y2="240" className="iso-arrow" />
        <line x1="400" y1="260" x2="300" y2="260" className="iso-arrow" />
        <text x="350" y="234" textAnchor="middle" className="iso-arrow-label">postMessage</text>
        <text x="350" y="276" textAnchor="middle" className="iso-arrow-label">JSON-RPC 2.0</text>

        {/* ── Isolated Iframe ── */}
        <rect x="400" y="20" width="280" height="280" className="iso-box-fill" />
        <rect x="400" y="20" width="280" height="280" className="iso-box" style={{ stroke: "#484848" }} />
        <text x="540" y="50" textAnchor="middle" className="iso-label">Isolated Iframe</text>
        <text x="540" y="65" textAnchor="middle" className="iso-sublabel">blob: (opaque origin)</text>

        {/* Iframe denials */}
        <text x="430" y="100" className="iso-denied">✗ window.__TAURI__</text>
        <text x="430" y="120" className="iso-denied">✗ filesystem APIs</text>
        <text x="430" y="140" className="iso-denied">✗ shell commands</text>
        <text x="430" y="160" className="iso-denied">✗ localStorage</text>
        <text x="430" y="180" className="iso-denied">✗ parent DOM</text>

        {/* What iframe CAN do */}
        <text x="430" y="210" className="iso-check">✓ render HTML/SVG</text>
        <text x="430" y="230" className="iso-check">✓ run scripts (sandboxed)</text>
        <text x="430" y="250" className="iso-check">✓ widget proxy</text>
      </svg>
    </div>
  );
}
