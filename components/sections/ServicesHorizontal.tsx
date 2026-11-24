"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services } from "@/content/site";
import { useReducedMotionPref } from "@/lib/hooks";
import { ServiceArt } from "../art/ServiceArt";
import { MaskText } from "../motion/MaskText";
import { ArrowRight } from "../ui/Icons";
import { SectionLabel } from "../ui/SectionLabel";
import { StairText } from "../ui/StairText";

// Distanța orizontală = 40vw (intro) + 6 × 52vw (panouri) + 8vw (final) − 100vw. Vezi `.hs` în globals.css.
const DISTANCE_VW = 260;

/** Desktop: secțiune lipicioasă; panourile defilează lateral la scroll vertical. */
export function ServicesHorizontal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${DISTANCE_VW}vw`]);
  const total = services.items.length;

  return (
    <div ref={ref} data-scroll-pin="panels" className="hs relative hidden lg:block">
      <div className="hs-sticky sticky top-0 h-screen overflow-hidden">
        <m.div data-scrub className="hs-track flex h-full" style={{ x: reduce ? 0 : x }}>
          <div className="flex h-full w-[var(--hs-intro)] shrink-0 flex-col justify-center pr-[4vw] pl-[clamp(1.25rem,4.5vw,4.5rem)]">
            <SectionLabel>{services.label}</SectionLabel>
            <MaskText id="servicii-titlu" text={services.title} className="mt-8 text-d3" />
            <p className="mt-8 max-w-[26rem] text-body text-stone">{services.intro}</p>
            <p className="label mt-14 flex items-center gap-4 text-ink motion-reduce:hidden" aria-hidden="true">
              {services.hint}
              <span className="block h-px w-16 bg-ink/40" />
              <ArrowRight className="size-4" />
            </p>
          </div>

          {services.items.map((s, i) => (
            <article
              key={s.title}
              className="flex h-full w-[var(--hs-panel)] shrink-0 flex-col border-l border-ink/10 px-[3.4vw] pt-[12vh]"
            >
              {/* Totul pornește de sus, la aceleași distanțe: numărul, desenul și titlul stau la aceeași înălțime în toate panourile. */}
              <p className="flex items-baseline gap-2 text-stone" aria-hidden="true">
                <span className="font-serif text-t1 italic">{String(i + 1).padStart(2, "0")}</span>
                <span className="label">/ {String(total).padStart(2, "0")}</span>
              </p>
              <ServiceArt name={s.art} className="mt-[4vh] aspect-square h-[34vh] w-auto shrink-0 self-start" />
              <h3 className="mt-[5.5vh] text-d3">{s.title}</h3>
              <StairText text={s.benefit} className="mt-5 max-w-[30rem] text-lead" />
              <StairText text={s.text} className="mt-3 max-w-[32rem] text-body text-stone" />
            </article>
          ))}
          <div aria-hidden="true" className="w-[var(--hs-end)] shrink-0" />
        </m.div>

        <div aria-hidden="true" className="hs-progress absolute right-[clamp(1.25rem,4.5vw,4.5rem)] bottom-10 left-[clamp(1.25rem,4.5vw,4.5rem)] h-px bg-ink/10">
          <m.div className="h-full origin-left bg-ink" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  );
}
