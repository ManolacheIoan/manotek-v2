"use client";

import { type MotionValue, m, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import { manifest } from "@/content/site";
import { toWords, type Word as WordT } from "@/lib/rich";
import { SectionLabel } from "../ui/SectionLabel";

// Opacitatea minimă păstrează contrastul de 3:1 (text mare) și pentru cuvintele încă „stinse”.
const DIM = 0.35;

function Word({ word, progress, range }: { word: WordT; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [DIM, 1]);
  const dimLayer = useTransform(progress, range, [DIM, 0]);
  const goldLayer = useTransform(progress, range, [0, 1]);
  return (
    <span className="inline-block">
      {word.parts.map((p, j) =>
        p.em ? (
          // Cuvântul-cheie: un strat crem care dispare și unul auriu care apare
          <span key={j} className="relative inline-block">
            <m.em data-scrub-dim style={{ opacity: dimLayer }} className="italic">
              {p.text}
            </m.em>
            <m.em data-scrub aria-hidden="true" style={{ opacity: goldLayer }} className="absolute inset-0 text-ochre italic">
              {p.text}
            </m.em>
          </span>
        ) : (
          <m.span key={j} data-scrub style={{ opacity }}>
            {p.text}
          </m.span>
        ),
      )}
    </span>
  );
}

/** Manifest: fraza se luminează cuvânt cu cuvânt, legat de scroll. */
export function Manifest() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = toWords(manifest.text);
  const start = 0.06;
  const end = 0.78;
  const step = (end - start) / words.length;
  const captionOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.78, 0.9], [16, 0]);

  return (
    <section
      ref={ref}
      id="manifest"
      data-theme="dark"
      data-scroll-pin
      aria-labelledby="manifest-text"
      className="relative h-[240vh] bg-ink text-paper motion-reduce:h-auto"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-40">
        <div className="wrap grid-page gap-y-10">
          <SectionLabel tone="dark" className="col-span-full lg:col-span-2 lg:pt-5">
            {manifest.label}
          </SectionLabel>
          <h2 id="manifest-text" className="col-span-full font-serif text-d2 font-light lg:col-span-10">
            {words.map((w, i) => (
              <Fragment key={i}>
                <Word word={w} progress={scrollYProgress} range={[start + i * step, start + (i + 1) * step]} />
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>
          <m.p
            data-scrub
            style={{ opacity: captionOpacity, y: captionY }}
            className="col-span-full max-w-[46rem] text-lead text-balance text-paper/62 md:col-span-5 lg:col-span-8 lg:col-start-3 lg:pl-[calc(var(--text-d2)*0.04)]"
          >
            {manifest.caption}
          </m.p>
        </div>
      </div>
    </section>
  );
}
