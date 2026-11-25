"use client";

import { m, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { steps } from "@/content/site";
import { useReducedMotionPref } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { StairText } from "../ui/StairText";

function Step({ index, title, text, reached }: { index: number; title: string; text: string; reached: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { margin: "0px 0px -30% 0px", once: true });
  return (
    <li ref={ref} className="relative pb-16 pl-14 last:pb-0 md:pl-20 lg:pb-24">
      <span
        data-dot
        aria-hidden="true"
        className="absolute top-[0.55rem] left-[5px] block size-[13px] rounded-full border border-ink/40 bg-paper md:left-[13px]"
      />
      <m.span
        aria-hidden="true"
        className="absolute top-[0.55rem] left-[5px] block size-[13px] rounded-full bg-ochre md:left-[13px]"
        initial={false}
        animate={{ scale: reached ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <m.div
        data-reveal
        initial={{ opacity: 0, x: -16 }}
        animate={seen ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <span className="font-serif text-[clamp(2.75rem,2rem+2.4vw,4.5rem)] leading-none font-light text-stone/70 italic">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-4 text-t1">{title}</h3>
        <StairText text={text} className="mt-3 max-w-[30rem] text-body text-stone" />
      </m.div>
    </li>
  );
}

/**
 * Procesul: o linie verticală care se desenează la scroll; nodurile se umplu când linia ajunge la ele.
 * `data-scroll-pace`: butonul „Derulează” trece prin pași cu 35% din viteză, ca să se poată citi.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 62%", "end 58%"] });
  const thresholds = useRef<number[]>([]);
  const [reached, setReached] = useState(0);

  // Poziția fiecărui nod pe linie, ca fracție din lungimea ei
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const inset = 12; // linia începe și se termină la 12px de margini (top-3 / bottom-3)
      const length = list.offsetHeight - inset * 2;
      thresholds.current = Array.from(list.querySelectorAll<HTMLElement>("[data-dot]")).map((dot) => {
        const li = dot.parentElement as HTMLElement;
        const center = li.offsetTop + dot.offsetTop + dot.offsetHeight / 2;
        return Math.max(0, (center - inset) / length);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setReached(thresholds.current.filter((t) => p >= t - 0.001).length);
  });

  const count = reduce ? steps.items.length : reached;

  return (
    <section id="proces" aria-labelledby="proces-titlu" className="pad-md">
      <div className="wrap grid-page gap-y-14">
        <div className="col-span-full md:col-span-5 lg:sticky lg:top-[22vh] lg:col-span-5 lg:self-start">
          <SectionLabel>{steps.label}</SectionLabel>
          <MaskText id="proces-titlu" text={steps.title} className="mt-6 text-d3" />
          <Reveal variant="fade" delay={0.2} className="mt-6 max-w-[26rem]">
            <StairText text={steps.intro} className="text-lead text-stone" />
          </Reveal>
        </div>

        <ol ref={listRef} data-scroll-pace="0.35" className="relative col-span-full md:col-span-5 md:col-start-2 lg:col-span-6 lg:col-start-7 lg:pt-4">
          <span aria-hidden="true" className="absolute top-3 bottom-3 left-[11px] w-px bg-rule md:left-[19px]" />
          <m.span
            aria-hidden="true"
            data-scrub
            className="absolute top-3 bottom-3 left-[11px] w-px origin-top bg-ochre md:left-[19px]"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          {steps.items.map((s, i) => (
            <Step key={s.title} index={i} title={s.title} text={s.text} reached={i < count} />
          ))}
        </ol>
      </div>
    </section>
  );
}
