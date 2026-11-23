"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useState } from "react";
import { services } from "@/content/site";
import { EASE } from "@/lib/motion";
import { ServiceArt } from "../art/ServiceArt";
import { MaskText } from "../motion/MaskText";
import { Plus } from "../ui/Icons";
import { SectionLabel } from "../ui/SectionLabel";
import { StairText } from "../ui/StairText";

/** Mobil și tabletă: listă verticală cu accordion. */
export function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="wrap pad-md lg:hidden">
      <SectionLabel>{services.label}</SectionLabel>
      <MaskText text={services.title} className="mt-6 text-d3 md:max-w-[34rem]" />
      <p className="mt-6 max-w-[30rem] text-body text-stone">{services.intro}</p>

      <ul className="mt-12 border-t border-ink/10">
        {services.items.map((s, i) => {
          const isOpen = open === i;
          const btn = `${uid}-b${i}`;
          const panel = `${uid}-p${i}`;
          return (
            <li key={s.title} className="border-b border-ink/10">
              <h3>
                <button
                  id={btn}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 py-6 text-left"
                >
                  <span aria-hidden="true" className="w-7 shrink-0 font-serif text-[1.1rem] text-stone italic">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-t1">{s.title}</span>
                  <Plus open={isOpen} />
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
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <div className="grid gap-8 pb-10 pl-11 md:grid-cols-[1fr_12rem] md:items-center md:gap-12">
                      <div>
                        <StairText text={s.benefit} className="text-lead" />
                        <StairText text={s.text} className="mt-3 text-body text-stone" />
                      </div>
                      <ServiceArt name={s.art} className="aspect-square h-auto w-full max-w-[12rem]" />
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
