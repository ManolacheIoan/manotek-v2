"use client";

import { m } from "framer-motion";
import { type KeyboardEvent, useRef, useState } from "react";
import { type Plan, pricing } from "@/content/site";
import { useReducedMotionPref } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { TextLink } from "../ui/TextLink";
import { StairText } from "../ui/StairText";

function PlanColumn({ plan, index, reduce }: { plan: Plan; index: number; reduce: boolean }) {
  const rec = plan.recommended;
  return (
    <m.article
      variants={{
        hide: { opacity: 0, y: 24, transition: reduce ? { duration: 0 } : { duration: 0.35, ease: EASE } },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: 0.12 + index * 0.08 },
        },
      }}
      className={`relative border-ink/10 pt-10 pb-12 md:grid md:grid-cols-2 md:gap-x-12 lg:flex lg:flex-col lg:px-8 ${
        index > 0 ? "border-t lg:border-t-0 lg:border-l" : "lg:pl-0"
      }`}
    >
      {rec ? (
        <span
          aria-hidden="true"
          className={`absolute top-[-1px] right-0 left-0 h-[2px] bg-ochre ${index > 0 ? "lg:left-8" : ""}`}
        />
      ) : null}
      <div>
      <div className={`min-h-6 items-center gap-3 ${rec ? "flex" : "hidden lg:flex"}`}>
        {rec ? (
          <p className="label flex items-center gap-2.5 text-ink">
            <span aria-hidden="true" className="block h-px w-5 bg-ochre" />
            {pricing.recommendedLabel}
          </p>
        ) : null}
      </div>
      <h3 className={`mt-4 text-t1 ${rec ? "italic" : ""}`}>{plan.name}</h3>
      <StairText text={plan.description} className="mt-3 max-w-[22rem] text-body text-stone lg:min-h-[3.3em]" />
      <p className="mt-8 flex items-baseline gap-x-2.5 whitespace-nowrap">
        <span className="text-small text-stone">{pricing.fromLabel}</span>
        <span className={`font-serif text-[clamp(2.5rem,1.6rem+2.4vw,4.25rem)] leading-none tracking-[-0.03em] ${rec ? "font-normal" : "font-light"}`}>
          {plan.price}
        </span>
        <span className="text-body">{plan.unit}</span>
      </p>
      </div>
      <div className="mt-9 flex flex-col md:mt-0 lg:mt-9 lg:flex-1">
        <ul className="flex-1 space-y-3.5 border-t border-ink/10 pt-7 md:border-t-0 md:pt-1 lg:border-t lg:pt-7">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3 text-body leading-snug">
              <span aria-hidden="true" className={`shrink-0 ${rec ? "text-ochre" : "text-ink/40"}`}>
                –
              </span>
              {f}
            </li>
          ))}
        </ul>
        {plan.footnote ? <p className="mt-6 text-small text-stone">{plan.footnote}</p> : null}
        <TextLink href={`/audit-gratuit?pachet=${encodeURIComponent(plan.name)}`} arrow className="mt-9 self-start text-body font-medium">
          {`${pricing.planCta} ${plan.name}`}
        </TextLink>
      </div>
    </m.article>
  );
}

/** Pachete: comutator „O singură plată / Abonament lunar”, cu tranziție animată. */
export function Pricing() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionPref();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + pricing.groups.length) % pricing.groups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="pachete" aria-labelledby="pachete-titlu" className="bg-sand py-[clamp(4rem,2.5rem+5vw,8rem)]">
      <div className="wrap grid-page gap-y-10">
        <div className="col-span-full md:col-span-6 lg:col-span-7">
          <SectionLabel>{pricing.label}</SectionLabel>
          <MaskText id="pachete-titlu" text={pricing.title} className="mt-6 text-d2" />
        </div>
        <div className="col-span-full flex flex-col gap-9 md:col-span-5 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal variant="fade" delay={0.15} className="max-w-[30rem]">
            <StairText text={pricing.intro} className="text-body text-stone" />
          </Reveal>
          <Reveal variant="rise" delay={0.25}>
            <div role="tablist" aria-label={pricing.label} className="relative grid w-full max-w-[25rem] grid-cols-2 rounded-full border border-ink/15 bg-paper p-1">
              <m.span
                aria-hidden="true"
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink"
                initial={false}
                animate={{ x: active === 0 ? "0%" : "100%" }}
                transition={{ duration: 0.6, ease: EASE }}
              />
              {pricing.groups.map((g, i) => (
                <button
                  key={g.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`tab-${g.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active === i}
                  aria-controls={`panou-${g.id}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                  className={`relative z-10 h-11 rounded-full px-4 text-[0.9375rem] font-medium transition-colors duration-500 ${
                    active === i ? "text-paper" : "text-ink"
                  }`}
                >
                  {g.tab}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal variant="rise" className="wrap mt-[clamp(4rem,2.5rem+5vw,8rem)]">
        <div className="grid border-t border-ink/80">
          {pricing.groups.map((g, gi) => {
            const on = gi === active;
            return (
              <m.div
                key={g.id}
                id={`panou-${g.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${g.id}`}
                aria-hidden={!on}
                inert={!on}
                initial={false}
                animate={on ? "show" : "hide"}
                variants={{ show: { transition: { staggerChildren: 0 } }, hide: {} }}
                className={`col-start-1 row-start-1 grid lg:grid-cols-3 ${on ? "" : "pointer-events-none"}`}
              >
                {g.plans.map((p, i) => (
                  <PlanColumn key={p.name} plan={p} index={i} reduce={reduce} />
                ))}
              </m.div>
            );
          })}
        </div>
        <p className="mt-4 border-t border-ink/10 pt-6 text-body">{pricing.note}</p>
      </Reveal>
    </section>
  );
}
