/**
 * Side-by-side comparison of Electron vs Tauri security models.
 * Electron: Node.js flows into renderer. Tauri: wall between webview and native.
 */
export function TauriComparison() {
  return (
    <div className="not-prose my-12 flex justify-center">
      <svg
        width="700"
        height="280"
        viewBox="0 0 700 280"
        fill="none"
        className="w-full max-w-[700px]"
      >
        <title>Comparison of Electron and Tauri security models</title>
        <style>{`
          .tc-label { fill: #e5e5e5; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 14px; font-weight: 600; }
          .tc-sublabel { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
          .tc-item { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .tc-danger { fill: #ef4444; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .tc-safe { fill: #22c55e; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .tc-accent { fill: #a993d1; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .tc-box { fill: none; stroke: #484848; stroke-width: 1.5; rx: 6; }
          .tc-box-fill { fill: #484848; opacity: 0.05; rx: 6; }
          .tc-box-good { fill: none; stroke: #a993d1; stroke-width: 1.5; rx: 6; }
          .tc-box-good-fill { fill: #a993d1; opacity: 0.05; rx: 6; }
          .tc-flow { stroke: #ef4444; stroke-width: 1.5; opacity: 0.5; marker-end: url(#tc-arrow-red); }
          .tc-wall { stroke: #22c55e; stroke-width: 2.5; opacity: 0.6; }
          .tc-divider { stroke: #333333; stroke-width: 1; stroke-dasharray: 4 4; }
        `}</style>

        <defs>
          <marker id="tc-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M 0 0 L 8 3 L 0 6" fill="none" stroke="#ef4444" strokeWidth="1" />
          </marker>
        </defs>

        {/* ── Divider ── */}
        <line x1="350" y1="10" x2="350" y2="270" className="tc-divider" />

        {/* ════════════════ ELECTRON (left) ════════════════ */}
        <text x="175" y="28" textAnchor="middle" className="tc-label" style={{ opacity: 0.5 }}>Electron</text>

        {/* Renderer box */}
        <rect x="30" y="50" width="140" height="120" className="tc-box-fill" />
        <rect x="30" y="50" width="140" height="120" className="tc-box" />
        <text x="100" y="72" textAnchor="middle" className="tc-sublabel">renderer</text>
        <text x="50" y="95" className="tc-item">Chromium</text>
        <text x="50" y="115" className="tc-danger">Node.js ⚠</text>
        <text x="50" y="135" className="tc-danger">require()</text>
        <text x="50" y="155" className="tc-danger">child_process</text>

        {/* Node.js backend box */}
        <rect x="190" y="50" width="140" height="120" className="tc-box-fill" />
        <rect x="190" y="50" width="140" height="120" className="tc-box" />
        <text x="260" y="72" textAnchor="middle" className="tc-sublabel">main process</text>
        <text x="210" y="95" className="tc-item">Node.js</text>
        <text x="210" y="115" className="tc-item">Full fs access</text>
        <text x="210" y="135" className="tc-item">Shell commands</text>
        <text x="210" y="155" className="tc-item">No restrictions</text>

        {/* Flow arrow — Node.js leaks into renderer */}
        <line x1="190" y1="110" x2="170" y2="110" className="tc-flow" />

        {/* Electron verdict */}
        <text x="175" y="200" textAnchor="middle" className="tc-danger" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>FULL NATIVE ACCESS FROM RENDERER</text>
        <text x="175" y="218" textAnchor="middle" className="tc-item" style={{ fontSize: "9px", opacity: 0.5 }}>One nodeIntegration: true away</text>
        <text x="175" y="236" textAnchor="middle" className="tc-item" style={{ fontSize: "9px", opacity: 0.5 }}>from compromise</text>

        {/* ════════════════ TAURI (right) ════════════════ */}
        <text x="525" y="28" textAnchor="middle" className="tc-label">Tauri</text>

        {/* Webview box */}
        <rect x="380" y="50" width="140" height="120" className="tc-box-good-fill" />
        <rect x="380" y="50" width="140" height="120" className="tc-box-good" />
        <text x="450" y="72" textAnchor="middle" className="tc-sublabel">webview</text>
        <text x="400" y="95" className="tc-safe">Native webview</text>
        <text x="400" y="115" className="tc-safe">No Node.js</text>
        <text x="400" y="135" className="tc-safe">No require()</text>
        <text x="400" y="155" className="tc-safe">No fs, no shell</text>

        {/* Capability wall */}
        <line x1="535" y1="52" x2="535" y2="168" className="tc-wall" />
        <text x="535" y="180" textAnchor="middle" className="tc-sublabel" style={{ fill: "#22c55e", fontSize: "7px" }}>CAPABILITY</text>
        <text x="535" y="190" textAnchor="middle" className="tc-sublabel" style={{ fill: "#22c55e", fontSize: "7px" }}>BOUNDARY</text>

        {/* Rust backend box */}
        <rect x="550" y="50" width="130" height="120" className="tc-box-good-fill" />
        <rect x="550" y="50" width="130" height="120" className="tc-box-good" />
        <text x="615" y="72" textAnchor="middle" className="tc-sublabel">rust backend</text>
        <text x="570" y="95" className="tc-accent">Explicit grants</text>
        <text x="570" y="115" className="tc-accent">Per-capability</text>
        <text x="570" y="135" className="tc-accent">Allowlist only</text>
        <text x="570" y="155" className="tc-accent">Type-safe IPC</text>

        {/* Tauri verdict */}
        <text x="525" y="218" textAnchor="middle" className="tc-safe" style={{ fontSize: "9px", letterSpacing: "0.15em" }}>WEBVIEW IS A DEAD END</text>
        <text x="525" y="236" textAnchor="middle" className="tc-item" style={{ fontSize: "9px", opacity: 0.5 }}>Nothing to hijack</text>
      </svg>
    </div>
  );
}
