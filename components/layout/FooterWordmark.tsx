"use client";

import { m } from "framer-motion";
import { EASE } from "@/lib/motion";

const letters = [
  { c: "M", em: false },
  { c: "a", em: false },
  { c: "n", em: false },
  { c: "o", em: false },
  { c: "t", em: true },
  { c: "e", em: true },
  { c: "k", em: true },
];

/** Wordmark-ul mare din footer; literele urcă pe rând. */
export function FooterWordmark() {
  return (
    <m.p
      aria-hidden="true"
      className="flex font-serif text-[30.2vw] leading-[0.82] font-light tracking-[-0.045em] whitespace-nowrap select-none"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {letters.map((l, i) => (
        <span key={i} className="mask">
          <m.span
            data-reveal
            className={l.em ? "italic text-ochre" : undefined}
            variants={{ hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.2, ease: EASE } } }}
          >
            {l.c}
          </m.span>
        </span>
      ))}
    </m.p>
  );
}
