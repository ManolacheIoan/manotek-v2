"use client";

import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { about } from "@/content/site";
import { useReducedMotionPref } from "@/lib/hooks";
import { EASE } from "@/lib/motion";
import { MaskText } from "../motion/MaskText";
import { Reveal } from "../motion/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { StairText } from "../ui/StairText";

/** Despre mine: fotografie mare, coborâtă față de text, cu parallax subtil. */
export function About() {
  const ref = useRef<HTMLElement>(null);
  const initials = about.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  const reduce = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [48, -48]);

  return (
    <section ref={ref} id="despre" aria-labelledby="despre-titlu" className="overflow-hidden pt-[clamp(5.5rem,3rem+7vw,11rem)]">
      <div className="wrap grid-page gap-y-16">
        <div className="col-span-full md:col-span-4 lg:col-span-5 lg:mt-40">
          <m.div data-scrub style={{ y: reduce ? 0 : y }} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
              {about.photo ? (
                <Image
                  src={about.photo}
                  alt={about.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
                  className="object-cover object-[50%_35%]"
                />
              ) : (
                // PLACEHOLDER: setează `about.photo` în content/site.ts ca să apară fotografia ta
                <div role="img" aria-label={`Loc pentru fotografia lui ${about.name}`} className="absolute inset-0">
                  <div className="absolute inset-4 border border-ink/10 md:inset-6" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center font-serif text-[clamp(7rem,5rem+9vw,14rem)] leading-none font-light text-ink/[0.07] italic"
                  >
                    {initials}
                  </span>
                  <p className="absolute bottom-8 left-8 flex items-center gap-3 text-small text-stone md:bottom-10 md:left-10">
                    <span aria-hidden="true" className="block h-px w-6 bg-ochre" />
                    {about.photoPlaceholder}
                  </p>
                </div>
              )}
              {/* Cortina care dezvăluie fotografia */}
              <m.div
                aria-hidden="true"
                data-curtain
                className="absolute inset-0 bg-paper"
                initial={{ y: "0%" }}
                whileInView={{ y: "-101%" }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </div>
          </m.div>
        </div>

        <div className="col-span-full md:col-span-5 md:col-start-2 lg:col-span-6 lg:col-start-7">
          <SectionLabel>{about.label}</SectionLabel>
          <MaskText id="despre-titlu" text={about.title} className="mt-6 text-d3" />
          <Reveal variant="rise" delay={0.15} className="mt-10 max-w-[34rem] space-y-5 text-body">
            {about.paragraphs.map((p, i) => (
              <StairText key={i} text={p} className={i === 0 ? "text-lead" : "text-stone"} />
            ))}
          </Reveal>
          <Reveal as="dl" variant="fade" delay={0.25} className="mt-12 max-w-[34rem] border-t border-ink/15">
            {about.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-rule py-4">
                <dt className="label pt-[0.3em] text-stone">{f.label}</dt>
                <dd className="text-body">{f.value}</dd>
              </div>
            ))}
          </Reveal>
          <Reveal variant="left" delay={0.3} className="mt-10">
            <p className="font-serif text-t1 font-light italic">{about.name}</p>
            <p className="mt-1 text-small text-stone">{about.role}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
