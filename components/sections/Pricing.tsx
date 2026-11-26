"use client";

import { m } from "framer-motion";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { type Plan, type PlanGroup, type Price, formatLei, pricing } from "@/content/site";
import { useReducedMotionPref } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { TextLink } from "../ui/TextLink";
import { StairText } from "../ui/StairText";

/** Fiecare bloc din panou iese repede și intră decalat, cu `delay`. */
const rise = (reduce: boolean, delay: number) => ({
  hide: { opacity: 0, y: 24, transition: reduce ? { duration: 0 } : { duration: 0.35, ease: EASE } },
  show: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { duration: 0.8, ease: EASE, delay } },
});

/** „lei”, „lei/lună”, „lei/clip” */
const unit = (price: Price) => (price.per ? `lei/${price.per}` : "lei");

const planHref = (plan: Plan) => `/audit-gratuit?pachet=${encodeURIComponent(plan.id)}`;

/** Prețul mare, în Fraunces: „1.200 lei”, „400 lei/lună”. */
function PriceTag({ price, rec, className = "" }: { price: Price; rec?: boolean; className?: string }) {
  return (
    <p className={`flex items-baseline gap-x-2.5 whitespace-nowrap ${className}`}>
      <span className={`font-serif text-[clamp(2.5rem,1.6rem+2.4vw,4.25rem)] leading-none tracking-[-0.03em] ${rec ? "font-normal" : "font-light"}`}>
        {formatLei(price.amount)}
      </span>
      <span className="text-body">{unit(price)}</span>
    </p>
  );
}

/** Mai multe variante de preț (de ex. 4, 10 sau 15 postări), ca tabel cu linii fine. */
function TierTable({ plan }: { plan: Plan }) {
  return (
    <table className="mt-8 w-full border-collapse">
      <caption className="sr-only">{plan.name}</caption>
      <tbody>
        {plan.tiers?.map((t) => (
          <tr key={t.label} className="border-t border-ink/10 last:border-b">
            <th scope="row" className="py-3.5 pr-4 text-left align-baseline text-body font-normal">
              {t.label}
            </th>
            <td className="py-3.5 text-right align-baseline whitespace-nowrap">
              <span className="font-serif text-[1.75rem] leading-none font-light tracking-[-0.02em]">{formatLei(t.price.amount)}</span>{" "}
              <span className="text-small">{unit(t.price)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Linia de deasupra listei: peste tot, doar pe telefon (rândul cu varianta) sau deloc (sub un tabel). */
const RULE = {
  all: "border-t border-ink/10 pt-7 md:border-t-0 md:pt-1 lg:border-t lg:pt-7",
  mobile: "border-t border-ink/10 pt-7 md:border-t-0 md:pt-1",
  none: "md:pt-1 lg:pt-0",
};

/** Lista „ce include”, nota de subsol și butonul care duce la formular. */
function PlanDetails({ plan, rec, rule = "all" }: { plan: Plan; rec?: boolean; rule?: keyof typeof RULE }) {
  const hasText = plan.features.length > 0 || Boolean(plan.footnote);
  return (
    <>
      {plan.features.length ? (
        <ul className={`flex-1 space-y-3.5 ${RULE[rule]}`}>
          {plan.features.map((f) => (
            <li key={f} className="flex gap-3 text-body leading-snug">
              <span aria-hidden="true" className={`shrink-0 ${rec ? "text-ochre" : "text-ink/40"}`}>
                –
              </span>
              {f}
            </li>
          ))}
        </ul>
      ) : (
        <div aria-hidden="true" className="flex-1" />
      )}
      {plan.footnote ? <p className="mt-6 text-small text-stone">{plan.footnote}</p> : null}
      <TextLink href={planHref(plan)} arrow className={`${hasText ? "mt-9" : ""} self-start text-body font-medium`}>
        {plan.cta}
      </TextLink>
    </>
  );
}

function PlanColumn({
  plan,
  index,
  reduce,
  badgeRow,
}: {
  plan: Plan;
  index: number;
  reduce: boolean;
  /** Rezervă rândul „Recomandat” și la celelalte coloane, ca numele și prețurile să stea aliniate. */
  badgeRow: boolean;
}) {
  const rec = plan.recommended;
  const savings = plan.separate && plan.price ? plan.separate - plan.price.amount : 0;
  return (
    <m.article
      variants={rise(reduce, 0.12 + index * 0.08)}
      className={`relative flex flex-col border-ink/10 pt-10 pb-12 md:grid md:grid-cols-2 md:gap-x-12 lg:flex lg:px-8 ${
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
        {badgeRow ? (
          <div className={`mb-4 min-h-6 items-center gap-3 ${rec ? "flex" : "hidden lg:flex"}`}>
            {rec ? (
              <p className="label flex items-center gap-2.5 text-ink">
                <span aria-hidden="true" className="block h-px w-5 bg-ochre" />
                {pricing.recommendedLabel}
              </p>
            ) : null}
          </div>
        ) : null}
        <h4 className={`text-t1 ${rec ? "italic" : ""}`}>{plan.name}</h4>
        {plan.description ? (
          <StairText text={plan.description} className="mt-3 max-w-[22rem] text-body text-stone" />
        ) : null}
        {plan.price ? <PriceTag price={plan.price} rec={rec} className="mt-8" /> : null}
        {savings > 0 && plan.separate && plan.price ? (
          <p className="mt-5 text-small text-stone">
            {pricing.separateLabel} {formatLei(plan.separate)} {unit(plan.price)}
            <br />
            <span className="font-medium text-ink">
              {pricing.savingsLabel} {formatLei(savings)} {unit(plan.price)}
            </span>
          </p>
        ) : null}
        {plan.tiers ? <TierTable plan={plan} /> : null}
      </div>
      <div className="mt-9 flex flex-1 flex-col md:mt-0 lg:mt-9">
        <PlanDetails plan={plan} rec={rec} rule={plan.tiers ? "none" : "all"} />
      </div>
    </m.article>
  );
}

/** Ce au în comun toate planurile grupei, plus o notă (de ex. despre domeniu). */
function IncludedRow({ group, reduce, delay }: { group: PlanGroup; reduce: boolean; delay: number }) {
  if (!group.included && !group.extraNote) return null;
  return (
    <m.div variants={rise(reduce, delay)} className="grid gap-y-5 border-t border-ink/10 py-8 lg:grid-cols-3 lg:py-10">
      {group.included ? <p className="label text-ink lg:pt-1 lg:pr-8">{group.included.title}</p> : null}
      <div className="lg:col-span-2 lg:px-8">
        {group.included ? (
          <ul className="flex flex-col gap-y-2.5 sm:flex-row sm:flex-wrap sm:gap-x-9">
            {group.included.items.map((item) => (
              <li key={item} className="flex gap-3 text-body leading-snug">
                <span aria-hidden="true" className="shrink-0 text-ochre">
                  –
                </span>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {group.extraNote ? <p className="mt-4 text-small text-stone">{group.extraNote}</p> : null}
      </div>
    </m.div>
  );
}

/** O variantă a unui plan (Site Business pe abonament), pe toată lățimea, sub planuri. */
function VariantRow({ group, reduce, delay }: { group: PlanGroup; reduce: boolean; delay: number }) {
  const plan = group.variant;
  if (!plan) return null;
  return (
    <m.article
      variants={rise(reduce, delay)}
      className="grid border-t border-ink/10 pt-10 pb-12 md:grid-cols-2 md:gap-x-12 lg:grid-cols-3 lg:gap-x-0"
    >
      {/* Pe tabletă numele și prețul stau în aceeași coloană; pe desktop, fiecare pe coloana lui */}
      <div className="lg:contents">
        <div className="lg:pr-8">
          <p className="label flex items-center gap-2.5 text-stone">
            <span aria-hidden="true" className="block h-px w-5 bg-ink/40" />
            {plan.label}
          </p>
          <h4 className="mt-4 text-t1">{plan.name}</h4>
        </div>
        <div className="mt-8 lg:mt-0 lg:px-8">
          {plan.upfront ? (
            <p className="text-body text-stone lg:pt-1">
              {formatLei(plan.upfront.amount)} lei {plan.upfront.label}
            </p>
          ) : null}
          {plan.price ? <PriceTag price={plan.price} className="mt-3" /> : null}
        </div>
      </div>
      <div className="mt-9 flex flex-col md:mt-0 lg:px-8">
        <PlanDetails plan={plan} rule="mobile" />
      </div>
    </m.article>
  );
}

/**
 * Pachete: comutator cu trei grupe (Site-uri / Pachete lunare / Servicii), cu tranziție animată.
 * Toate prețurile și textele vin din `pricing` și `prices` (content/site.ts).
 * `data-scroll-pace`: butonul „Derulează” trece prin pachete cu 30% din viteză, ca să se poată citi.
 */
export function Pricing() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotionPref();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // Poziția și lățimea indicatorului, măsurate după butonul activ (etichetele au lățimi diferite).
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  useEffect(() => {
    const el = tabs.current[active];
    if (!el) return;
    // ResizeObserver raportează o dată imediat, apoi la orice schimbare (fonturi încărcate, rotire ecran).
    const ro = new ResizeObserver(() => setPill({ x: el.offsetLeft, w: el.offsetWidth }));
    tabs.current.forEach((b) => b && ro.observe(b));
    return () => ro.disconnect();
  }, [active]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + pricing.groups.length) % pricing.groups.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="pachete" aria-labelledby="pachete-titlu" className="bg-sand pt-[clamp(4rem,2.5rem+5vw,8rem)] pb-8 lg:pb-10">
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
            <div role="tablist" aria-label={pricing.label} className="relative flex w-full max-w-[28rem] rounded-full border border-ink/15 bg-paper p-1">
              {pill ? (
                <m.span
                  aria-hidden="true"
                  className="absolute top-1 bottom-1 left-0 rounded-full bg-ink"
                  initial={false}
                  animate={{ x: pill.x, width: pill.w }}
                  transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
                />
              ) : null}
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
                  className={`relative z-10 h-11 flex-auto rounded-full px-3 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-500 sm:px-4 lg:px-2.5 xl:px-4 ${
                    active === i ? "text-paper" : "text-ink"
                  } ${active === i && !pill ? "bg-ink" : ""}`}
                >
                  {g.tab}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal variant="rise" className="wrap mt-[clamp(4rem,2.5rem+5vw,8rem)]">
        {/* Panoul activ dă înălțimea; celelalte stau suprapuse peste el, ascunse, cât își termină ieșirea */}
        <div data-scroll-pace="0.3" className="relative border-t border-ink/80">
          {pricing.groups.map((g, gi) => {
            const on = gi === active;
            const badgeRow = g.plans.some((p) => p.recommended);
            const after = 0.12 + g.plans.length * 0.08;
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
                className={on ? "relative" : "pointer-events-none absolute inset-x-0 top-0"}
              >
                <m.div
                  variants={rise(reduce, 0.06)}
                  className="flex flex-col gap-1 border-b border-ink/10 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <h3 className="label text-ink">{g.title}</h3>
                  {g.subtitle ? <p className="text-small text-stone">{g.subtitle}</p> : null}
                </m.div>
                <div className="grid lg:grid-cols-3">
                  {g.plans.map((p, i) => (
                    <PlanColumn key={p.id} plan={p} index={i} reduce={reduce} badgeRow={badgeRow} />
                  ))}
                </div>
                <IncludedRow group={g} reduce={reduce} delay={after} />
                <VariantRow group={g} reduce={reduce} delay={after + 0.08} />
              </m.div>
            );
          })}
        </div>
        <div className="mt-4 space-y-1 border-t border-ink/10 pt-8 text-body lg:pt-10">
          {pricing.notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
