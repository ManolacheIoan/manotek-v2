"use client";

import { cubicBezier } from "framer-motion";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { scrollStep } from "@/content/site";
import { ArrowRight } from "../ui/Icons";
import { isHeading, scrollTarget, scrollToY } from "@/lib/scroll";

/** Curba unui scroll făcut de mână: pornește lin, accelerează, apoi frânează lung. */
const NATURAL = cubicBezier(0.33, 0.1, 0.15, 1);
/** Pentru o apăsare în timpul unei derulări: continuă din viteză, fără să mai pornească lent. */
const CHAINED = cubicBezier(0.2, 0.55, 0.15, 1);

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

/**
 * Secțiunile lipicioase active pe ecranul curent (Manifest, Serviciile pe desktop): conținutul
 * stă pe loc și se animă cât derulezi. Cu mișcare redusă devin secțiuni obișnuite.
 */
function pinnedSections() {
  const vh = window.innerHeight;
  return Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-pin]")).filter((el) => {
    const child = el.firstElementChild;
    return el.offsetHeight > vh + 10 && !!child && getComputedStyle(child).position === "sticky";
  });
}

/**
 * Opririle butonului, în pixeli de la începutul paginii:
 * - începutul fiecărei secțiuni (și al footerului);
 * - pașii marcați cu `data-scroll-stop`: sus (implicit) sau „center” (la mijlocul ecranului);
 * - finalul fiecărei secțiuni lipicioase (animația ei s-a terminat), iar la Servicii
 *   câte un pas pe panou (scroll-ul vertical mută panourile 1:1 pe orizontală).
 */
function collectStops(max: number) {
  const vh = window.innerHeight;
  const y = window.scrollY;
  const stops: number[] = [];

  document.querySelectorAll("main > section, main > article, main ~ footer").forEach((el) => {
    stops.push(el.getBoundingClientRect().top + y);
  });

  document.querySelectorAll<HTMLElement>("[data-scroll-stop]").forEach((el) => {
    if (!el.getClientRects().length) return; // ascuns pe ecranul curent
    const r = el.getBoundingClientRect();
    if (el.dataset.scrollStop === "center") stops.push(r.top + y + r.height / 2 - vh / 2);
    else stops.push(r.top + y - vh * 0.12);
  });

  for (const el of pinnedSections()) {
    const start = el.getBoundingClientRect().top + y;
    const distance = el.offsetHeight - vh;
    stops.push(start + distance);
    if (el.dataset.scrollPin === "panels") {
      const gutter = Math.min(Math.max(20, window.innerWidth * 0.045), 72);
      el.querySelectorAll<HTMLElement>("article").forEach((panel) => {
        stops.push(start + Math.min(Math.max(panel.offsetLeft - gutter, 0), distance));
      });
    }
  }

  // În ordine, în limitele paginii; din două opriri foarte apropiate o păstrăm pe a doua
  const sorted = stops.map((s) => Math.round(Math.min(Math.max(s, 0), max))).sort((a, b) => a - b);
  const out: number[] = [];
  for (const s of sorted) {
    if (out.length && s - out[out.length - 1] < vh * 0.3) out[out.length - 1] = s;
    else out.push(s);
  }
  return out;
}

/** Drumul dintre două poziții rămâne în aceeași secțiune lipicioasă? */
function insidePinned(from: number, to: number) {
  const y = window.scrollY;
  const vh = window.innerHeight;
  return pinnedSections().some((el) => {
    const top = el.getBoundingClientRect().top + y;
    return from >= top - 4 && to <= top + el.offsetHeight - vh + 4;
  });
}

/** Următoarea oprire; în secțiunile lungi, cel mult cam un ecran pe pas, ca să nu sară peste conținut. */
function nextStop(base: number, max: number) {
  const vh = window.innerHeight;
  const next = collectStops(max).find((s) => s > base + 8) ?? max;
  if (next - base > vh * 1.15 && !insidePinned(base, next)) return Math.min(base + vh * 0.85, max);
  return next;
}

/**
 * Butonul „Derulează”, mereu vizibil: la fiecare apăsare coboară lin la secțiunea următoare,
 * ca un scroll făcut de mână. La finalul paginii devine „Sus”.
 * Desktop: pastilă în dreapta jos. Mobil: cerc în stânga jos (în dreapta e WhatsApp).
 */
export function ScrollStepper() {
  const ref = useRef<HTMLButtonElement>(null);
  const [view, setView] = useState({ dark: false, end: false, scrollable: true });

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const btn = ref.current;
      const max = maxScroll();
      let dark = false;
      if (btn) {
        // Ce se află sub buton: peste secțiunile închise își inversează culorile
        const r = btn.getBoundingClientRect();
        const under = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2).find((el) => !btn.contains(el));
        dark = !!under?.closest('[data-theme="dark"]');
      }
      const next = { dark, end: window.scrollY >= max - 4, scrollable: max > 40 };
      setView((v) => (v.dark === next.dark && v.end === next.end && v.scrollable === next.scrollable ? v : next));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, []);

  const onClick = () => {
    const vh = window.innerHeight;
    const max = maxScroll();
    const chained = isHeading();
    const base = scrollTarget();
    const easing = chained ? CHAINED : NATURAL;
    if (base >= max - 4) {
      scrollToY(0, Math.min(2.4, 1 + (base / vh) * 0.08), easing);
      return;
    }
    const target = nextStop(base, max);
    scrollToY(target, Math.min(1.6, 0.7 + (Math.abs(target - window.scrollY) / vh) * 0.4), easing);
  };

  const { dark, end, scrollable } = view;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={end ? scrollStep.ariaTop : scrollStep.aria}
      style={{ "--d": "1400ms" } as CSSProperties}
      className={`hero-fade fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 flex h-12 min-w-12 items-center justify-center gap-3 rounded-full border backdrop-blur transition-[background-color,border-color,color,opacity] duration-500 md:right-[clamp(1.25rem,4.5vw,4.5rem)] md:bottom-8 md:left-auto md:px-5 ${
        dark ? "border-paper/20 bg-ink/80 text-paper hover:border-paper/50" : "border-rule bg-paper/90 text-ink hover:border-ink/40"
      } ${scrollable ? "" : "pointer-events-none opacity-0"}`}
    >
      <span className="label hidden md:inline">{end ? scrollStep.labelTop : scrollStep.label}</span>
      <ArrowRight
        className={`size-[18px] transition-transform duration-500 md:hidden ${end ? "-rotate-90" : "rotate-90"}`}
      />
      <span
        aria-hidden="true"
        className={`relative hidden h-5 w-px overflow-hidden transition-transform duration-500 md:block ${dark ? "bg-paper/25" : "bg-ink/15"} ${end ? "rotate-180" : ""}`}
      >
        <span className="scroll-cue absolute inset-x-0 top-0 block h-1/3 bg-current" />
      </span>
    </button>
  );
}
