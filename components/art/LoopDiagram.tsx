"use client";

import { AnimatePresence, m } from "framer-motion";
import type { CSSProperties } from "react";
import { EASE } from "@/lib/motion";

// Cerc cu centrul (200, 200) și raza 150; nodurile la −90° (sus), 30° și 150°.
const ARCS = [
  "M231.2 53.3A150 150 0 0 1 342.7 246.4",
  "M311.5 300.4A150 150 0 0 1 88.5 300.4",
  "M57.3 246.4A150 150 0 0 1 168.8 53.3",
];
const HEADS = [
  "M349.39 240.38 342.7 246.4 340.83 237.6",
  "M90.37 309.2 88.5 300.4 97.06 303.18",
  "M160.24 50.52 168.8 53.3 162.11 59.32",
];
const NODES = [
  { x: 200, y: 50 },
  { x: 329.9, y: 275 },
  { x: 70.1, y: 275 },
];
const LABELS: CSSProperties[] = [
  { left: "50%", top: "7.5%", transform: "translate(-50%, -100%)" },
  { left: "86%", top: "74%", transform: "translate(0, 0)" },
  { left: "14%", top: "74%", transform: "translate(-100%, 0)" },
];

type Step = { label: string; example: string };

/** Diagrama buclei obiceiului. Etapa activă: nod auriu, arcul spre ea desenat, exemplul în centru. */
export function LoopDiagram({
  steps,
  active,
  exampleLabel,
}: {
  steps: Step[];
  active: number;
  exampleLabel: string;
}) {
  const arcIn = (active + 2) % 3;
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[38rem] px-[10%] py-[8%]">
      <div className="relative h-full w-full">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="200" cy="200" r="104" stroke="var(--color-rule)" strokeWidth="1" strokeDasharray="1.5 7" />
          {ARCS.map((d) => (
            <path key={d} d={d} stroke="var(--color-ink)" strokeOpacity={0.22} strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          ))}
          {HEADS.map((d, i) => (
            <path
              key={d}
              d={d}
              stroke={i === arcIn ? "var(--color-ochre)" : "var(--color-ink)"}
              strokeOpacity={i === arcIn ? 1 : 0.3}
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke-opacity] duration-500"
            />
          ))}
          <m.path
            key={`arc-${arcIn}`}
            d={ARCS[arcIn]}
            stroke="var(--color-ochre)"
            strokeWidth="1.75"
            data-draw
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          {NODES.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="7" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              <m.circle
                cx={n.x}
                cy={n.y}
                r="7"
                fill="var(--color-ochre)"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                initial={false}
                animate={{ scale: i === active ? 1.45 : 0, opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </g>
          ))}
        </svg>

        {steps.map((s, i) => (
          <span
            key={s.label}
            className={`label absolute flex items-baseline gap-2 whitespace-nowrap transition-colors duration-500 ${
              i === active ? "text-ink" : "text-stone"
            }`}
            style={LABELS[i]}
          >
            <span className="text-stone">{String(i + 1).padStart(2, "0")}</span>
            <span className="hidden lg:inline">{s.label}</span>
          </span>
        ))}

        <div className="absolute inset-[30%] flex flex-col items-center justify-center text-center">
          <span className="label text-stone">
            <span className="lg:hidden">{steps[active].label}</span>
            <span className="hidden lg:inline">{exampleLabel}</span>
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={active}
              className="mt-3 font-serif text-[clamp(1.2rem,0.9rem+1.1vw,1.9rem)] leading-[1.15] font-light text-ink italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              {steps[active].example}
            </m.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
