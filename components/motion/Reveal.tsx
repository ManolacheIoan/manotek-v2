"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

const presets = {
  /** urcă puțin și apare */
  rise: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  /** doar apare */
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  /** intră din stânga */
  left: { hidden: { opacity: 0, x: -36 }, show: { opacity: 1, x: 0 } },
  /** intră din dreapta */
  right: { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0 } },
  /** crește foarte puțin */
  scale: { hidden: { opacity: 0, scale: 0.965 }, show: { opacity: 1, scale: 1 } },
};

const tags = { div: m.div, li: m.li, p: m.p, article: m.article, aside: m.aside, dl: m.dl, span: m.span };

type Props = {
  children: ReactNode;
  variant?: keyof typeof presets;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof typeof tags;
  id?: string;
};

/** Apariție la intrarea în ecran. Variantele diferă intenționat de la o secțiune la alta. */
export function Reveal({ children, variant = "rise", delay = 0, duration = 0.9, className, as = "div", id }: Props) {
  const Comp = tags[as];
  return (
    <Comp
      id={id}
      data-reveal
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={presets[variant]}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
