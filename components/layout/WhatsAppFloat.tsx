"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { contact, whatsappHref } from "@/content/site";
import { WhatsApp } from "../ui/Icons";

/** Buton WhatsApp discret, doar pe mobil: apare după hero, dispare la contact și în footer. */
export function WhatsAppFloat() {
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  const [covered, setCovered] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setPast(y > window.innerHeight * 0.75));

  useEffect(() => {
    const targets = document.querySelectorAll("[data-hide-wa]");
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setCovered(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {past && !covered ? (
        <m.a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${contact.whatsappLabel} (se deschide într-o filă nouă)`}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-12 place-items-center rounded-full border border-rule bg-paper/95 text-ink backdrop-blur md:hidden"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.4 }}
        >
          <WhatsApp className="size-[22px]" />
        </m.a>
      ) : null}
    </AnimatePresence>
  );
}
