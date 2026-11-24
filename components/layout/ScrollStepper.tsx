"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { scrollStep } from "@/content/site";
import { isHeading, scrollTarget, scrollToY } from "@/lib/scroll";
import { ArrowRight } from "../ui/Icons";

/**
 * Mișcarea unui scroll lin, ca făcut cu mâna: pornește încet (`a`, partea din timp în care
 * accelerează), trece cu viteză constantă prin conținut, apoi încetinește lung (`d`) până la oprire.
 * Viteza nu sare niciodată: urcă și coboară după o curbă sinusoidală.
 */
function cruise(t: number, a: number, d: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const v = 1 / (1 - (a + d) / 2); // viteza de croazieră, ca drumul total să fie 1
  if (a > 0 && t < a) return v * (t / 2 - (a / (2 * Math.PI)) * Math.sin((Math.PI * t) / a));
  if (t <= 1 - d) return v * (a / 2 + (t - a));
  const u = t - (1 - d);
  return v * (a / 2 + (1 - a - d) + u / 2 + (d / (2 * Math.PI)) * Math.sin((Math.PI * u) / d));
}

const NATURAL = (t: number) => cruise(t, 0.22, 0.38);
/** Apăsat în timpul unei derulări: continuă din mers, fără să mai pornească de pe loc. */
const CHAINED = (t: number) => cruise(t, 0, 0.4);

/** Durata unui pas: cam un ecran și un sfert pe secundă, între 1,2 și 5 secunde. */
const stepDuration = (distance: number) => Math.min(5, Math.max(1.2, 0.8 + distance / (window.innerHeight * 1.25)));

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

/**
 * Secțiune lipicioasă (`data-scroll-pin`, Manifestul): textul stă pe loc și se aprinde cât derulezi.
 * Oprirea e la finalul animației, ca fraza să apară întreagă dintr-o singură apăsare.
 * Cu mișcare redusă devine o secțiune obișnuită.
 */
function pinEnd(el: HTMLElement, top: number) {
  const vh = window.innerHeight;
  const child = el.firstElementChild;
  const pinned = el.dataset.scrollPin !== undefined && el.offsetHeight > vh + 10 && !!child && getComputedStyle(child).position === "sticky";
  return pinned ? top + el.offsetHeight - vh : null;
}

/** Opririle butonului: câte una pe secțiune (și footerul), în pixeli de la începutul paginii. */
function collectStops(max: number) {
  const vh = window.innerHeight;
  const y = window.scrollY;
  const stops: number[] = [];
  document.querySelectorAll<HTMLElement>("main > section, main > article, main ~ footer").forEach((el) => {
    const top = el.getBoundingClientRect().top + y;
    stops.push(pinEnd(el, top) ?? top);
  });

  // În ordine, în limitele paginii; din două opriri foarte apropiate o păstrăm pe a doua
  const sorted = stops.map((s) => Math.round(Math.min(Math.max(s, 0), max))).sort((a, b) => a - b);
  const out: number[] = [];
  for (const s of sorted) {
    if (out.length && s - out[out.length - 1] < vh * 0.3) out[out.length - 1] = s;
    else out.push(s);
  }
  return out;
}

/**
 * Butonul „Derulează”, mereu vizibil: la fiecare apăsare trece lin prin secțiunea curentă și
 * se oprește la începutul următoarei, ca un scroll făcut de mână. La finalul paginii devine „Sus”.
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
    const easing = isHeading() ? CHAINED : NATURAL;
    const base = scrollTarget();
    if (base >= max - 4) {
      scrollToY(0, Math.min(3, Math.max(1.5, 1.2 + window.scrollY / (vh * 6))), easing);
      return;
    }
    let target = collectStops(max).find((s) => s > base + 8) ?? max;
    // Dacă după oprire mai rămâne doar o bucată mică de pagină (finalul footerului), mergem până jos
    if (max - target < vh * 0.6) target = max;
    scrollToY(target, stepDuration(Math.abs(target - window.scrollY)), easing);
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
