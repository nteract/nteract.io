/**
 * Diagram showing the Unix socket architecture.
 * The daemon at center, connected to app and agents via Unix socket,
 * with "no network" emphasized.
 */
export function SocketDiagram() {
  return (
    <div className="not-prose my-12 flex justify-center">
      <svg
        width="700"
        height="260"
        viewBox="0 0 700 260"
        fill="none"
        className="w-full max-w-[700px]"
      >
        <title>Unix socket architecture: daemon connected to app and agents locally, no network exposure</title>
        <style>{`
          .sock-label { fill: #e5e5e5; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 13px; font-weight: 600; }
          .sock-sublabel { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
          .sock-detail { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 9px; }
          .sock-accent { fill: #a993d1; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.05em; }
          .sock-circle { fill: none; stroke: #a993d1; stroke-width: 2; }
          .sock-circle-fill { fill: #a993d1; opacity: 0.1; }
          .sock-line { stroke: #a993d1; stroke-width: 1.5; stroke-dasharray: 4 4; opacity: 0.4; }
          .sock-denied { stroke: #ef4444; stroke-width: 1.5; opacity: 0.4; }
          .sock-denied-label { fill: #ef4444; font-family: 'JetBrains Mono', monospace; font-size: 9px; opacity: 0.7; }
          .sock-hex { fill: #0e0e0e; stroke: #a993d1; stroke-width: 2; }
          .sock-hex-fill { fill: #a993d1; opacity: 0.15; }
          @keyframes sock-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
          .sock-pulse { animation: sock-pulse 2.5s ease-in-out infinite; }
        `}</style>

        {/* ── Daemon (center hexagon) ── */}
        <g transform="translate(350, 120)">
          <polygon points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21" className="sock-hex-fill" />
          <polygon points="0,-42 36,-21 36,21 0,42 -36,21 -36,-21" className="sock-hex" />
          <text y="-2" textAnchor="middle" className="sock-label" style={{ fontSize: "11px" }}>runtimed</text>
          <text y="14" textAnchor="middle" className="sock-sublabel">daemon</text>
          <text y="62" textAnchor="middle" className="sock-accent">chmod 0600</text>
        </g>

        {/* ── Connection lines ── */}
        {/* App → Daemon */}
        <line x1="130" y1="70" x2="310" y2="100" className="sock-line" />
        {/* Agent 1 → Daemon */}
        <line x1="100" y1="190" x2="310" y2="135" className="sock-line" />
        {/* Agent 2 → Daemon */}
        <line x1="210" y1="220" x2="320" y2="145" className="sock-line" />

        {/* ── Traveling dots ── */}
        <circle r="2.5" fill="#a993d1" className="sock-pulse">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 130 70 L 310 100" />
        </circle>
        <circle r="2.5" fill="#a993d1" className="sock-pulse" style={{ animationDelay: "0.8s" }}>
          <animateMotion dur="2.5s" repeatCount="indefinite" path="M 100 190 L 310 135" />
        </circle>

        {/* ── nteract App (top left) ── */}
        <g transform="translate(90, 60)">
          <circle r="28" className="sock-circle-fill" cx="0" cy="0" />
          <circle r="28" className="sock-circle" cx="0" cy="0" />
          <circle cx="0" cy="-5" r="5" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <path d="M -8 8 Q -8 1 0 1 Q 8 1 8 8" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <text y="-40" textAnchor="middle" className="sock-label">App</text>
        </g>

        {/* ── Agent 1 (bottom left) ── */}
        <g transform="translate(70, 190)">
          <circle r="24" className="sock-circle-fill" cx="0" cy="0" />
          <circle r="24" className="sock-circle" cx="0" cy="0" />
          <rect x="-6" y="-8" width="12" height="10" rx="2" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <circle cx="-2" cy="-3" r="1.2" fill="#a993d1" />
          <circle cx="2" cy="-3" r="1.2" fill="#a993d1" />
          <text y="38" textAnchor="middle" className="sock-label" style={{ fontSize: "11px" }}>Claude Code</text>
        </g>

        {/* ── Agent 2 ── */}
        <g transform="translate(190, 220)">
          <circle r="24" className="sock-circle-fill" cx="0" cy="0" />
          <circle r="24" className="sock-circle" cx="0" cy="0" />
          <rect x="-6" y="-8" width="12" height="10" rx="2" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <circle cx="-2" cy="-3" r="1.2" fill="#a993d1" />
          <circle cx="2" cy="-3" r="1.2" fill="#a993d1" />
          <text y="38" textAnchor="middle" className="sock-label" style={{ fontSize: "11px" }}>Codex</text>
        </g>

        {/* ── Unix Socket label ── */}
        <text x="200" y="130" textAnchor="middle" className="sock-sublabel" transform="rotate(-10, 200, 130)">unix socket</text>

        {/* ── "No Network" zone (right side) ── */}
        <g transform="translate(560, 120)">
          {/* Crossed-out network icon */}
          <circle r="36" fill="none" stroke="#484848" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="0" cy="-8" r="14" fill="none" stroke="#484848" strokeWidth="1.5" />
          <line x1="-8" y1="6" x2="8" y2="6" stroke="#484848" strokeWidth="1.5" />
          <line x1="-12" y1="14" x2="12" y2="14" stroke="#484848" strokeWidth="1.5" />
          <line x1="0" y1="6" x2="0" y2="14" stroke="#484848" strokeWidth="1.5" />
          {/* X strike-through */}
          <line x1="-22" y1="-22" x2="22" y2="22" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
          <text y="52" textAnchor="middle" className="sock-denied-label">NO OPEN PORTS</text>
          <text y="64" textAnchor="middle" className="sock-denied-label">NO CORS</text>
          <text y="76" textAnchor="middle" className="sock-denied-label">NO HTTP SERVER</text>
        </g>
      </svg>
    </div>
  );
}
