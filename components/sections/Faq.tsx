"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useState } from "react";
import { faq } from "@/content/site";
import { useReducedMotionPref } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { Plus } from "../ui/Icons";
import { SectionLabel } from "../ui/SectionLabel";
import { TextLink } from "../ui/TextLink";
import { StairText } from "../ui/StairText";

type Props = {
  id?: string;
  label?: string;
  title?: string;
  intro?: string;
  /** Răspunsul poate avea mai multe paragrafe: `a: ["…", "…"]`. */
  items?: { q: string; a: string | string[] }[];
};

/** Întrebări frecvente: listă cu linii fine, accordion fluid și „+” care se rotește. */
export function Faq({ id = "intrebari", label = faq.label, title = faq.title, intro = faq.intro, items = faq.items }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotionPref();
  const uid = useId();

  return (
    <section id={id} aria-labelledby={`${id}-titlu`} className="pad-md">
      <div className="wrap grid-page gap-y-12">
        <div className="col-span-full md:col-span-5 lg:sticky lg:top-[20vh] lg:col-span-4 lg:self-start">
          <SectionLabel>{label}</SectionLabel>
          <MaskText id={`${id}-titlu`} text={title} className="mt-6 text-d3" />
          <Reveal as="p" variant="fade" delay={0.2} className="mt-6 max-w-[22rem] text-body text-stone">
            {intro}{" "}
            <TextLink href="/#contact" staticLine className="text-ink">
              {faq.cta}
            </TextLink>
          </Reveal>
        </div>

        <Reveal variant="fade" className="col-span-full border-t border-ink/80 md:col-span-6 lg:col-span-7 lg:col-start-6">
          <ul>
            {items.map((item, i) => {
              const isOpen = open === i;
              const btn = `${uid}-b${i}`;
              const panel = `${uid}-p${i}`;
              return (
                <li key={item.q} className="border-b border-rule">
                  <h3>
                    <button
                      id={btn}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panel}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span className="font-serif text-[clamp(1.3rem,1.1rem+0.7vw,1.75rem)] leading-snug tracking-[-0.01em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                          isOpen ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink"
                        }`}
                      >
                        <Plus open={isOpen} className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <m.div
                        id={panel}
                        role="region"
                        aria-labelledby={btn}
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }}
                      >
                        <div className="max-w-[40rem] space-y-3 pr-2 pb-8 md:pr-14">
                          {(Array.isArray(item.a) ? item.a : [item.a]).map((p) => (
                            <StairText key={p} text={p} className="text-body text-stone" />
                          ))}
                        </div>
                      </m.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
