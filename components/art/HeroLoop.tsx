import type { CSSProperties } from "react";
import { hero } from "@/content/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Aceeași geometrie ca diagrama din Metoda: cerc cu centrul (200, 200), raza 150,
// nodurile la −90° (sus), 30° și 150°.
const arcs = [
  "M231.2 53.3A150 150 0 0 1 342.7 246.4",
  "M311.5 300.4A150 150 0 0 1 88.5 300.4",
  "M57.3 246.4A150 150 0 0 1 168.8 53.3",
];
const heads = [
  "M349.39 240.38 342.7 246.4 340.83 237.6",
  "M90.37 309.2 88.5 300.4 97.06 303.18",
  "M160.24 50.52 168.8 53.3 162.11 59.32",
];
const nodes = [
  { cx: 200, cy: 50 },
  { cx: 329.9, cy: 275 },
  { cx: 70.1, cy: 275 },
];
const labels: CSSProperties[] = [
  { left: "50%", top: "6.5%", transform: "translate(-50%, -100%)" },
  { left: "86%", top: "74%", transform: "translate(0, 0)" },
  { left: "14%", top: "74%", transform: "translate(-100%, 0)" },
];

/** Compoziția din hero: bucla indiciu → rutină → recompensă, desenată lent. */
export function HeroLoop() {
  return (
    <figure role="img" aria-label={hero.loopLabel} className="relative mx-auto aspect-square w-[68%] max-w-[36rem] text-ink md:w-[72%] lg:w-[86%]">
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="98" className="hero-fade text-rule" strokeDasharray="1.5 7" style={d(400)} />
        {arcs.map((p, i) => (
          <path key={p} d={p} pathLength={1} className="draw" style={d(650 + i * 320)} />
        ))}
        {heads.map((p, i) => (
          <path key={p} d={p} className="hero-fade" style={d(1500 + i * 320)} />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r="5.5" fill="var(--color-paper)" className="hero-fade" style={d(500 + i * 320)} />
        ))}
        <g className="orbit" style={{ ...d(2400), transformOrigin: "200px 200px" }}>
          <circle cx="329.9" cy="125" r="4.5" fill="var(--color-ochre)" stroke="none" className="hero-fade" style={d(2400)} />
        </g>
      </svg>
      {hero.loop.map((label, i) => (
        <span
          key={label}
          aria-hidden="true"
          className="hero-fade label absolute flex items-baseline gap-2 whitespace-nowrap text-ink"
          style={{ ...labels[i], ...d(900 + i * 320) }}
        >
          <span className="text-stone">{String(i + 1).padStart(2, "0")}</span>
          <span className="hidden md:inline">{label}</span>
        </span>
      ))}
      <span
        aria-hidden="true"
        className="hero-fade absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[clamp(1rem,0.8rem+0.6vw,1.3rem)] whitespace-nowrap text-stone italic"
        style={d(1900)}
      >
        bucla obiceiului
      </span>
    </figure>
  );
}
