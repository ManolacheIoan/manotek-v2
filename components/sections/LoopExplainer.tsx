"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { method } from "@/content/site";
import { DESKTOP, useMediaQuery, useReducedMotionPref } from "@/lib/hooks";
import { LoopDiagram } from "../art/LoopDiagram";
import { Reveal } from "../motion/Reveal";
import { StairText } from "../ui/StairText";

/**
 * Bucla obiceiului, interactivă. Pe desktop, etapa din mijlocul ecranului (sau cea de sub
 * mouse) se activează în diagrama lipicioasă. Pe mobil, etapele se schimbă singure cât
 * diagrama e vizibilă, sau la atingere.
 */
export function LoopExplainer() {
  const { loop, exampleLabel } = method;
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const desktop = useMediaQuery(DESKTOP);
  const reduce = useReducedMotionPref();
  const listRef = useRef<HTMLOListElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramInView = useInView(diagramRef, { amount: 0.6 });

  // Desktop: etapa care trece prin mijlocul ecranului devine activă
  useEffect(() => {
    if (!desktop || !listRef.current) return;
    const items = Array.from(listRef.current.querySelectorAll<HTMLElement>("[data-step]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [desktop]);

  // Mobil: etapele se schimbă singure, până când utilizatorul alege una
  useEffect(() => {
    if (desktop || touched || reduce || !diagramInView) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % loop.steps.length), 2800);
    return () => window.clearInterval(t);
  }, [desktop, touched, reduce, diagramInView, loop.steps.length]);

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <div className="wrap grid-page mt-16 lg:mt-16">
      <div
        ref={diagramRef}
        className="col-span-full md:col-span-4 md:col-start-2 lg:sticky lg:top-0 lg:col-span-6 lg:col-start-1 lg:flex lg:h-screen lg:items-center lg:self-start"
      >
        <LoopDiagram steps={loop.steps} active={active} exampleLabel={exampleLabel} />
      </div>

      <div className="col-span-full mt-12 md:col-span-5 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:pt-[18vh] lg:pb-[6vh]">
        <Reveal variant="fade">
          <h3 className="text-d3">{loop.title}</h3>
          <StairText text={loop.text} className="mt-5 max-w-[30rem] text-body text-stone" />
        </Reveal>

        <ol ref={listRef} className="mt-10 lg:mt-16">
          {loop.steps.map((s, i) => {
            const on = i === active;
            return (
              <li
                key={s.label}
                data-step={i}
                data-scroll-stop={desktop ? "center" : undefined}
                onPointerEnter={(e) => e.pointerType === "mouse" && desktop && setActive(i)}
                className="relative border-t border-rule py-7 lg:flex lg:min-h-[46vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-[-1px] left-0 h-px w-full origin-left bg-ochre transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:top-1/2 lg:-left-8 lg:h-12 lg:w-px lg:-translate-y-1/2 lg:origin-top ${
                    on ? "scale-x-100 lg:scale-y-100" : "scale-x-0 lg:scale-x-100 lg:scale-y-0"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={on}
                  className="flex items-baseline gap-4 text-left"
                >
                  <span className="label text-stone">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`font-serif text-[clamp(1.75rem,1.3rem+1.8vw,3rem)] leading-[1.05] tracking-[-0.02em] transition-colors duration-500 ${on ? "text-ink" : "text-ink/55"}`}>
                    {s.label}
                  </span>
                </button>
                <StairText text={s.text} className="mt-3 max-w-[28rem] text-body text-stone" />
                <p className="mt-3 font-serif text-[1.375rem] leading-snug italic">
                  <span className="sr-only">{exampleLabel}: </span>
                  {s.example}
                </p>
              </li>
            );
          })}
        </ol>

        <Reveal variant="rise" className="mt-6 border-l border-ochre pl-5 lg:mt-0">
          <StairText text={loop.note} className="max-w-[30rem] text-body" />
        </Reveal>
      </div>
    </div>
  );
}
