"use client";

import { m } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "@/lib/motion";
import { toWords } from "@/lib/rich";

type Tag = "h1" | "h2" | "h3" | "h4" | "p";

type Props = {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  /** Clasa pentru cuvintele marcate cu *steluțe* */
  emClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
};

const tags = { h1: m.h1, h2: m.h2, h3: m.h3, h4: m.h4, p: m.p };

/**
 * Titlu care apare cuvânt cu cuvânt dintr-o mască. Cuvintele de pe același rând
 * urcă aproape împreună, așa că efectul se citește ca „rânduri care urcă”.
 */
export function MaskText({
  text,
  as = "h2",
  id,
  className,
  emClassName = "italic text-ochre",
  delay = 0,
  stagger = 0.035,
  duration = 1.05,
}: Props) {
  const Comp = tags[as];
  const words = toWords(text);

  return (
    <Comp
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask">
            <m.span
              data-reveal
              variants={{
                hidden: { y: "118%" },
                show: { y: "0%", transition: { duration, ease: EASE } },
              }}
            >
              {w.parts.map((p, j) =>
                p.em ? (
                  <em key={j} className={emClassName}>
                    {p.text}
                  </em>
                ) : (
                  <Fragment key={j}>{p.text}</Fragment>
                ),
              )}
            </m.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}
