/**
 * Peer diagram showing three Automerge peers (Human, Agent, Runtime)
 * connected through a shared CRDT document.
 * Horizontal layout: Human & Agent on left, Document center, Runtime right.
 */
export function PeerDiagram() {
  return (
    <div className="not-prose my-12 flex justify-center">
      <svg
        width="700"
        height="240"
        viewBox="0 -10 700 260"
        fill="none"
        className="w-full max-w-[700px]"
      >
        <style>{`
          .peer-line-dim { stroke: #a993d1; stroke-width: 2; stroke-linecap: round; stroke-dasharray: 4 4; opacity: 0.4; }
          .peer-line-solid { stroke: #a993d1; stroke-width: 2; stroke-linecap: round; opacity: 0.2; }
          .peer-circle { fill: none; stroke: #a993d1; stroke-width: 2; }
          .peer-circle-fill { fill: #a993d1; opacity: 0.1; }
          .peer-diamond { fill: #0e0e0e; stroke: #a993d1; stroke-width: 2; }
          .peer-diamond-inner { fill: #a993d1; opacity: 0.3; }
          .peer-label { fill: #e5e5e5; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 13px; font-weight: 600; }
          .peer-sublabel { fill: #ababab; font-family: 'JetBrains Mono', monospace; font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; }
          .doc-label { fill: #a993d1; font-family: 'Space Grotesk', system-ui, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.05em; }
          .sync-dot { fill: #a993d1; }
          @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
          @keyframes travel1 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
          @keyframes travel2 { 0% { offset-distance: 100%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 0%; opacity: 0; } }
          .pulse { animation: pulse 3s ease-in-out infinite; }
          .travel-dot-1 { offset-path: path('M 130 75 Q 230 75 330 110'); animation: travel1 2.5s ease-in-out infinite; }
          .travel-dot-2 { offset-path: path('M 130 165 Q 230 165 330 130'); animation: travel1 3s ease-in-out infinite 0.8s; }
          .travel-dot-3 { offset-path: path('M 570 120 Q 480 120 380 120'); animation: travel1 2s ease-in-out infinite 0.4s; }
        `}</style>

        {/* ── Curved connection lines ── */}
        {/* Human → Doc */}
        <path d="M 130 75 Q 230 75 330 110" className="peer-line-dim" />
        <path d="M 130 75 Q 230 75 330 110" className="peer-line-solid" />
        {/* Agent → Doc */}
        <path d="M 130 165 Q 230 165 330 130" className="peer-line-dim" />
        <path d="M 130 165 Q 230 165 330 130" className="peer-line-solid" />
        {/* Runtime → Doc */}
        <path d="M 570 120 Q 480 120 380 120" className="peer-line-dim" />
        <path d="M 570 120 Q 480 120 380 120" className="peer-line-solid" />

        {/* ── Traveling sync dots ── */}
        <circle r="3" className="sync-dot travel-dot-1" />
        <circle r="3" className="sync-dot travel-dot-2" />
        <circle r="3" className="sync-dot travel-dot-3" />

        {/* ── Human peer (top left) ── */}
        <g transform="translate(80, 75)">
          <circle r="32" className="peer-circle-fill" cx="0" cy="0" />
          <circle r="32" className="peer-circle" cx="0" cy="0" />
          <circle r="26" className="peer-circle pulse" cx="0" cy="0" style={{ strokeDasharray: "4 4", opacity: 0.3 }} />
          <circle cx="0" cy="-6" r="6" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <path d="M -10 10 Q -10 2 0 2 Q 10 2 10 10" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <text y="-50" textAnchor="middle" className="peer-label">Human</text>
          <text y="-38" textAnchor="middle" className="peer-sublabel">nteract app</text>
        </g>

        {/* ── Agent peer (bottom left) ── */}
        <g transform="translate(80, 165)">
          <circle r="32" className="peer-circle-fill" cx="0" cy="0" />
          <circle r="32" className="peer-circle" cx="0" cy="0" />
          <circle r="26" className="peer-circle pulse" cx="0" cy="0" style={{ strokeDasharray: "4 4", opacity: 0.3, animationDelay: "1s" }} />
          <rect x="-8" y="-10" width="16" height="13" rx="3" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <circle cx="-3" cy="-4" r="1.5" fill="#a993d1" />
          <circle cx="3" cy="-4" r="1.5" fill="#a993d1" />
          <line x1="0" y1="3" x2="0" y2="8" stroke="#a993d1" strokeWidth="1.5" />
          <line x1="-5" y1="8" x2="5" y2="8" stroke="#a993d1" strokeWidth="1.5" strokeLinecap="round" />
          <text y="50" textAnchor="middle" className="peer-label">Agent</text>
          <text y="64" textAnchor="middle" className="peer-sublabel">mcp server</text>
        </g>

        {/* ── Central document (diamond) ── */}
        <g transform="translate(350, 120)">
          <rect x="-20" y="-20" width="40" height="40" rx="2" transform="rotate(45)" className="peer-diamond" />
          <rect x="-12" y="-12" width="24" height="24" rx="1" transform="rotate(45)" className="peer-diamond-inner" />
          <text y="42" textAnchor="middle" className="doc-label">Notebook Document</text>
        </g>

        {/* ── Runtime peer (right) ── */}
        <g transform="translate(620, 120)">
          <circle r="32" className="peer-circle-fill" cx="0" cy="0" />
          <circle r="32" className="peer-circle" cx="0" cy="0" />
          <circle r="26" className="peer-circle pulse" cx="0" cy="0" style={{ strokeDasharray: "4 4", opacity: 0.3, animationDelay: "2s" }} />
          <path d="M 0 -10 L 6 -4 L 6 4 L 0 10 L -6 4 L -6 -4 Z" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <circle cx="0" cy="0" r="3" stroke="#a993d1" strokeWidth="1.5" fill="none" />
          <text y="-50" textAnchor="middle" className="peer-label">Runtime</text>
          <text y="-38" textAnchor="middle" className="peer-sublabel">runtimed</text>
        </g>
      </svg>
    </div>
  );
}
