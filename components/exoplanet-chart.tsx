"use client";

import { useId, useMemo, useState } from "react";
import data from "./exoplanet-data.json";

// Converted from the executed notebook's exoplanets-planetary-years.plotly.json.
// All 5,927 measured periods are retained. Vertical offsets only separate dots.
// NASA/IPAC archive via Julien Simon, CC BY 4.0, revision e0d2d45654b61c45ba3381d2ad273c606d9a4d2e.
type Planet = [name: string, days: number, jitter: number];
type Group = { name: string; total: number; color: string; median: number; quartiles: number[]; planets: Planet[] };
const groups = data as Group[];
const ranges = [
  { label: "All reported periods", min: .1, max: 10_000_000 },
  { label: "Shorter than an Earth year", min: .1, max: 365.25 },
  { label: "1–100 Earth years", min: 365.25, max: 36525 },
  { label: "Longer than 100 Earth years", min: 36525, max: 10_000_000 },
];
const number = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

export function ExoplanetChart() {
  const id = useId();
  const [method, setMethod] = useState("All methods");
  const [rangeIndex, setRangeIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [hover, setHover] = useState<{ name: string; days: number; method: string } | null>(null);
  const range = ranges[rangeIndex];
  const x = (days: number) => 28 + (Math.log10(days) - Math.log10(range.min)) / (Math.log10(range.max) - Math.log10(range.min)) * 804;
  const visible = useMemo(() => groups.map(group => ({ ...group, planets: group.planets.filter(([name, days]) =>
    (method === "All methods" || group.name === method) && days >= range.min && days <= range.max && name.toLowerCase().includes(query.trim().toLowerCase()),
  ) })), [method, range, query]);
  const count = visible.reduce((n, group) => n + group.planets.length, 0);
  const ticks = [-1,0,1,2,3,4,5,6,7].map(n => 10 ** n).filter(n => n >= range.min && n <= range.max);
  const controlClass = "min-h-11 min-w-0 rounded border border-border bg-background px-3 text-sm text-foreground";

  return (
    <figure className="not-prose my-10 overflow-hidden rounded-lg border border-border bg-background">
      <div className="border-b border-border p-4 sm:p-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">Explore the notebook’s data</p>
        <h3 className="text-xl font-semibold leading-tight sm:text-2xl">Different searches reveal different planetary years</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Each dot is a catalogued planet with a reported orbital period. Filter the same measured subsets used in the notebook.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-sm">Discovery method
            <select className={controlClass} value={method} onChange={e => { setMethod(e.target.value); setHover(null); }}>
              <option>All methods</option>{groups.map(g => <option key={g.name}>{g.name}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm">Planetary year
            <select className={controlClass} value={rangeIndex} onChange={e => { setRangeIndex(Number(e.target.value)); setHover(null); }}>
              {ranges.map((r,i) => <option key={r.label} value={i}>{r.label}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-sm">Find a planet
            <input className={controlClass} type="search" value={query} placeholder="Try HR 8799" onChange={e => { setQuery(e.target.value); setHover(null); }} />
          </label>
          <button className={`${controlClass} self-end font-medium`} onClick={() => { setMethod("All methods"); setRangeIndex(0); setQuery(""); setHover(null); }}>Reset view</button>
        </div>
      </div>
      <div tabIndex={0} role="region" aria-label="Planetary period chart; scroll horizontally on small screens" className="overflow-x-auto p-3 focus-visible:outline-2 focus-visible:outline-offset-[-2px]">
        <svg viewBox="0 0 860 470" className="min-w-[640px] w-full" role="img" aria-labelledby={`${id}-title ${id}-description`} onPointerLeave={() => setHover(null)}>
          <title id={`${id}-title`}>Reported planetary years by discovery method</title>
          <desc id={`${id}-description`}>Logarithmic orbital periods in days. Vertical jitter separates overlapping planets and has no scientific meaning. Full-subset counts and medians appear in the table below.</desc>
          {ticks.map(t => <g key={t}><line x1={x(t)} x2={x(t)} y1={34} y2={405} stroke="currentColor" opacity=".12" /><text x={x(t)} y={429} textAnchor="middle" fontSize={12} fill="currentColor">{t >= 1e6 ? `${t/1e6}m` : number.format(t)}</text></g>)}
          {range.min <= 365.25 && range.max >= 365.25 && <g><line x1={x(365.25)} x2={x(365.25)} y1={34} y2={405} stroke="currentColor" opacity=".5" strokeDasharray="4 4"/><text x={x(365.25)} y={21} fontSize={12} textAnchor="middle" fill="currentColor">Earth’s year</text></g>}
          {visible.map((g,i) => <g key={g.name}>
            <text x={28} y={57+i*124} fontSize={15} fontWeight={600} fill={g.color}>{g.name} · {number.format(g.planets.length)} in view</text>
            {g.planets.map(([name, days, jitter]) => <circle key={name} cx={x(days)} cy={100+i*124-jitter*160} r={i===2?3.5:2.6} fill={g.color} opacity={i===2?.8:.27} onPointerEnter={() => setHover({name,days,method:g.name})}><title>{`${name}: ${number.format(days)} days · ${g.name}`}</title></circle>)}
            {rangeIndex === 0 && !query.trim() && g.planets.length > 0 && <g pointerEvents="none">
              <line x1={x(g.quartiles[0])} x2={x(g.quartiles[1])} y1={100+i*124} y2={100+i*124} stroke={g.color} strokeWidth={5} />
              <circle cx={x(g.median)} cy={100+i*124} r={5} fill="var(--background)" stroke={g.color} strokeWidth={2} />
              <text x={28} y={149+i*124} fontSize={12} fill="currentColor">Median {g.name === "Imaging" ? `${Math.round(g.median/365.25)} years` : `${Math.round(g.median)} days`} · bar: middle 50%</text>
            </g>}
          </g>)}
          <text x={430} y={458} textAnchor="middle" fontSize={13} fill="currentColor">Orbital period in days · logarithmic scale</text>
        </svg>
      </div>
      <div className="border-t border-border p-4 text-sm leading-6 sm:px-6">
        <p role="status">{number.format(count)} of 5,927 measured planets in view.</p>
        <p className="min-h-12 text-muted-foreground">{hover ? `${hover.name} · ${hover.method} · ${number.format(hover.days)} days (${number.format(hover.days/365.25)} Earth years)` : "Point to a dot to inspect a planet, or search by name above."}</p>
        {query.trim() && <ul aria-label="Matching planets" className="my-2">{visible.flatMap(g => g.planets.slice(0,5).map(([name,days]) => <li key={name}>{name} · {number.format(days)} days</li>))}</ul>}
        <details className="mt-2"><summary className="cursor-pointer py-2 font-medium">Read the full-subset summary</summary>
          <table className="w-full text-left text-sm"><caption className="text-left text-muted-foreground">Original notebook subsets, before the filters above.</caption><thead><tr><th className="py-2">Method</th><th>Periods / total</th><th>Median</th></tr></thead><tbody>{groups.map(g => <tr key={g.name}><th className="py-2 font-normal">{g.name}</th><td>{number.format(g.planets.length)} / {number.format(g.total)}</td><td>{g.name==="Imaging" ? `${Math.round(g.median/365.25)} years` : `${Math.round(g.median)} days`}</td></tr>)}</tbody></table>
        </details>
        <figcaption className="mt-3 !font-sans !text-sm !normal-case !tracking-normal text-muted-foreground">Rebuilt in JSX from “The worlds our searches reveal.” This is the notebook’s measured catalogue subset, not the distribution of all planets. Data: NASA Exoplanet Archive via <a className="underline" href="https://huggingface.co/datasets/juliensimon/nasa-exoplanets/tree/e0d2d45654b61c45ba3381d2ad273c606d9a4d2e">Julien Simon’s pinned mirror</a> (<a className="underline" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>).</figcaption>
      </div>
    </figure>
  );
}
