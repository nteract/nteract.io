/**
 * Two-surface architecture:
 *   - Control plane: Unix socket (0600) ← App, agents
 *   - Data plane: GET-only HTTP blob store on 127.0.0.1:<ephemeral> → iframes
 * Both bind locally only; nothing is reachable off-host.
 */
export function SocketDiagram() {
  return (
    <div className="not-prose my-12 flex justify-center">
      <svg
        width="720"
        height="340"
        viewBox="0 0 720 340"
        fill="none"
        className="w-full max-w-[720px]"
      >
        <title>
          runtimed exposes two local-only surfaces: a Unix socket for control
          and a GET-only HTTP blob store for binary output data
        </title>
        <style>{`
          .sd-label { fill: #e5e5e5; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 13px; font-weight: 600; }
          .sd-sub { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
          .sd-mono { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .sd-purple { fill: #a993d1; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.05em; }
          .sd-teal { fill: #7dd3c4; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.05em; }
          .sd-check { fill: #86efac; font-family: 'JetBrains Mono', monospace; font-size: 10px; }
          .sd-circle { fill: none; stroke: #a993d1; stroke-width: 2; }
          .sd-circle-fill { fill: #a993d1; opacity: 0.1; }
          .sd-iframe { fill: none; stroke: #7dd3c4; stroke-width: 2; }
          .sd-iframe-fill { fill: #7dd3c4; opacity: 0.08; }
          .sd-ctrl-line { stroke: #a993d1; stroke-width: 1.5; stroke-dasharray: 4 4; opacity: 0.55; }
          .sd-data-line { stroke: #7dd3c4; stroke-width: 1.5; opacity: 0.55; }
          .sd-hex { fill: #0e0e0e; stroke: #a993d1; stroke-width: 2; }
          .sd-hex-fill { fill: #a993d1; opacity: 0.15; }
          .sd-divider { stroke: #484848; stroke-width: 1; stroke-dasharray: 2 4; opacity: 0.5; }
          @keyframes sd-pulse { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.8; } }
          .sd-pulse { animation: sd-pulse 2.5s ease-in-out infinite; }
        `}</style>

        {/* ── Daemon (center hexagon) ── */}
        <g transform="translate(360, 150)">
          <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22" className="sd-hex-fill" />
          <polygon points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22" className="sd-hex" />
          <text y="-2" textAnchor="middle" className="sd-label" style={{ fontSize: "11px" }}>runtimed</text>
          <text y="14" textAnchor="middle" className="sd-sub">daemon</text>
        </g>

        {/* ── Control-plane lines (left) ── */}
        <line x1="130" y1="80" x2="322" y2="128" className="sd-ctrl-line" />
        <line x1="130" y1="220" x2="322" y2="172" className="sd-ctrl-line" />

        {/* Pulse dots */}
        <circle r="2.5" fill="#a993d1" className="sd-pulse">
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M 130 80 L 322 128" />
        </circle>
        <circle r="2.5" fill="#a993d1" className="sd-pulse" style={{ animationDelay: "0.9s" }}>
          <animateMotion dur="2.6s" repeatCount="indefinite" path="M 130 220 L 322 172" />
        </circle>

        <text x="220" y="116" textAnchor="middle" className="sd-sub" transform="rotate(-12, 220, 116)">unix socket</text>

        {/* ── App (upper left) ── */}
        <g transform="translate(100, 75)">
          <circle r="30" className="sd-circle-fill" />
          <circle r="30" className="sd-circle" />
          <rect x="-12" y="-9" width="24" height="16" rx="2" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <line x1="-12" y1="-2" x2="12" y2="-2" stroke="#a993d1" strokeWidth="1" />
          <circle cx="-8" cy="-6" r="1" fill="#a993d1" />
          <text y="-42" textAnchor="middle" className="sd-label">nteract App</text>
        </g>

        {/* ── Agents (lower left) ── */}
        <g transform="translate(100, 220)">
          <circle r="30" className="sd-circle-fill" />
          <circle r="30" className="sd-circle" />
          <rect x="-8" y="-10" width="16" height="12" rx="2" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <circle cx="-3" cy="-4" r="1.4" fill="#a993d1" />
          <circle cx="3" cy="-4" r="1.4" fill="#a993d1" />
          <path d="M -4 8 L 4 8" stroke="#a993d1" strokeWidth="1.5" />
          <text y="48" textAnchor="middle" className="sd-label">MCP agents</text>
          <text y="62" textAnchor="middle" className="sd-sub">claude · codex · warp</text>
        </g>

        {/* ── Data-plane line (right) ── */}
        <line x1="400" y1="150" x2="560" y2="150" className="sd-data-line" />
        <circle r="2.5" fill="#7dd3c4" className="sd-pulse" style={{ animationDelay: "0.3s" }}>
          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 400 150 L 560 150" />
        </circle>
        <text x="480" y="142" textAnchor="middle" className="sd-sub" style={{ letterSpacing: "0.1em" }}>http get</text>

        {/* ── Iframe (right) ── */}
        <g transform="translate(605, 150)">
          <rect x="-45" y="-34" width="90" height="68" rx="3" className="sd-iframe-fill" />
          <rect x="-45" y="-34" width="90" height="68" rx="3" className="sd-iframe" />
          <line x1="-45" y1="-22" x2="45" y2="-22" stroke="#7dd3c4" strokeWidth="1" opacity="0.5" />
          <circle cx="-38" cy="-28" r="1.5" fill="#7dd3c4" opacity="0.8" />
          <circle cx="-32" cy="-28" r="1.5" fill="#7dd3c4" opacity="0.8" />
          <circle cx="-26" cy="-28" r="1.5" fill="#7dd3c4" opacity="0.8" />
          {/* output glyph */}
          <path d="M -20 0 L -8 -12 L 6 4 L 20 -10" stroke="#7dd3c4" strokeWidth="1.5" fill="none" opacity="0.7" />
          <circle cx="-20" cy="0" r="2" fill="#7dd3c4" />
          <circle cx="-8" cy="-12" r="2" fill="#7dd3c4" />
          <circle cx="6" cy="4" r="2" fill="#7dd3c4" />
          <circle cx="20" cy="-10" r="2" fill="#7dd3c4" />
          <text y="-52" textAnchor="middle" className="sd-label">Output iframes</text>
          <text y="52" textAnchor="middle" className="sd-sub">blob: origin</text>
        </g>

        {/* ── Legend divider ── */}
        <line x1="30" y1="272" x2="690" y2="272" className="sd-divider" />

        {/* ── Legend: Control plane ── */}
        <g transform="translate(60, 296)">
          <rect x="0" y="-8" width="12" height="4" fill="#a993d1" opacity="0.55" />
          <rect x="16" y="-8" width="4" height="4" fill="#a993d1" opacity="0.55" />
          <rect x="24" y="-8" width="4" height="4" fill="#a993d1" opacity="0.55" />
          <text x="40" y="-3" className="sd-purple">CONTROL</text>
          <text x="40" y="14" className="sd-mono">unix socket · chmod 0600 · owner-only</text>
        </g>

        {/* ── Legend: Data plane ── */}
        <g transform="translate(400, 296)">
          <rect x="0" y="-8" width="28" height="4" fill="#7dd3c4" opacity="0.55" />
          <text x="40" y="-3" className="sd-teal">DATA</text>
          <text x="40" y="14" className="sd-mono">127.0.0.1:&lt;random&gt; · GET /blob/&#123;sha256&#125;</text>
        </g>
      </svg>
    </div>
  );
}
