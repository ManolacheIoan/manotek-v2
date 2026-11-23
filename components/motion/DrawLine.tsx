"use client";

import { m } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Linie fină care se desenează de la stânga (sau de sus) la intrarea în ecran. */
export function DrawLine({
  className = "bg-rule",
  delay = 0,
  vertical = false,
  duration = 1.1,
}: {
  className?: string;
  delay?: number;
  vertical?: boolean;
  duration?: number;
}) {
  return (
    <m.span
      aria-hidden="true"
      data-reveal
      className={`block ${vertical ? "w-px" : "h-px w-full"} ${className}`}
      style={{ transformOrigin: vertical ? "top center" : "left center" }}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    />
  );
}
