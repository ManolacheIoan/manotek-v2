"use client";

import { m } from "framer-motion";
import { useId } from "react";
import { useReducedMotionPref } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { ART, BACKDROP, type ArtName, type FillTone, type StrokeTone } from "./serviceArtData";

/** Contururi groase și închise, detalii subțiri și gri, accentul auriu puțin mai apăsat (e mai deschis la culoare). */
const STROKE: Record<StrokeTone, { color: string; width: number }> = {
  ink: { color: "var(--color-ink)", width: 1.25 },
  stone: { color: "var(--color-stone)", width: 1 },
  ochre: { color: "var(--color-ochre)", width: 1.5 },
};

const FILL: Record<FillTone, string> = {
  paper: "var(--color-paper)",
  rule: "var(--color-rule)",
  ink: "var(--color-ink)",
  ochre: "var(--color-ochre)",
};

const fade = (reduce: boolean) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: reduce ? 0 : 0.6 } },
});

/**
 * O ilustrație de serviciu, pe o pânză pătrată umplută de cercul din spate.
 * Liniile au grosime constantă la orice mărime și se desenează la intrarea în ecran
 * printr-o mască, ca grosimea să nu se schimbe în timpul animației.
 */
export function ServiceArt({ name, className = "" }: { name: ArtName; className?: string }) {
  const reduce = useReducedMotionPref();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { fit, items } = ART[name];
  const s = fit?.s ?? 1;
  const transform = fit ? `translate(${(fit.x ?? 0) + 160 * (1 - s)} ${(fit.y ?? 0) + 160 * (1 - s)}) scale(${s})` : undefined;
  const draw = reduce ? { duration: 0 } : { duration: 1.1, ease: EASE };
  // desenul complet durează cel mult ~2,2s, oricâte linii are ilustrația
  const stagger = reduce ? 0 : Math.min(0.07, 1.1 / items.length);

  return (
    <m.svg
      viewBox="0 0 320 320"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px -8% 0px -8%" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } } }}
    >
      <m.path d={BACKDROP} fill={FILL.paper} data-reveal variants={fade(reduce)} />
      <g transform={transform}>
        {items.map((item, i) =>
          item.kind === "fill" ? (
            <m.path key={i} d={item.d} fill={FILL[item.tone]} data-reveal variants={fade(reduce)} />
          ) : (
            <g key={i}>
              <mask id={`${uid}-${i}`} maskUnits="userSpaceOnUse" x="-20" y="-20" width="360" height="360">
                <m.path
                  d={item.d}
                  stroke="#fff"
                  strokeWidth={14}
                  data-draw
                  // la lungime 0, capetele rotunde ar lăsa câte un punct vizibil la începutul liniei: opacitatea 0 îl ascunde
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    show: { pathLength: 1, opacity: 1, transition: { ...draw, opacity: { duration: 0 } } },
                  }}
                />
              </mask>
              <path
                d={item.d}
                mask={`url(#${uid}-${i})`}
                stroke={STROKE[item.tone].color}
                strokeWidth={STROKE[item.tone].width}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          ),
        )}
      </g>
    </m.svg>
  );
}
