"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { scrollStep } from "@/content/site";
import { centeredStop, isHeading, pageSpan, scrollTarget, scrollToY } from "@/lib/scroll";
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

/**
 * Pornirea ține 22% din pas și frâna 38%, dar cel mult 1,2 s, respectiv 2 s: pe drumurile lungi
 * (panourile Serviciilor) restul e viteză constantă, la fel pentru fiecare panou.
 */
const natural = (duration: number) => (t: number) => cruise(t, Math.min(0.22, 1.2 / duration), Math.min(0.38, 2 / duration));
/** Apăsat în timpul unei derulări: continuă din mers, fără să mai pornească de pe loc. */
const chained = (duration: number) => (t: number) => cruise(t, 0, Math.min(0.4, 2 / duration));

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

/**
 * Secțiune lipicioasă: primul copil e `sticky` și secțiunea e mai înaltă decât ecranul.
 * Întoarce poziția la care se termină animația (după ea secțiunea iese din ecran), altfel `null`.
 * Cu mișcare redusă nu mai e lipicioasă.
 */
function stickyEnd(el: HTMLElement, top: number) {
  const vh = window.innerHeight;
  const child = el.firstElementChild;
  const sticky = el.offsetHeight > vh + 10 && !!child && getComputedStyle(child).position === "sticky";
  return sticky ? top + el.offsetHeight - vh : null;
}

/** O zonă `data-scroll-pace`: între pozițiile `a` și `b` ale paginii, butonul merge cu `pace` din viteza lui. */
type Zone = { a: number; b: number; pace: number };

/**
 * Zonele `data-scroll-pace`, în pixeli de la începutul paginii. Încep când blocul ajunge la mijlocul
 * ecranului (o secțiune lipicioasă, ca galeria Serviciilor: când se fixează) și se termină când
 * marginea lui de jos trece de mijlocul ecranului.
 * Zonele se pot cuprinde una pe alta (principiile, în Metodă): contează cea mai lentă.
 */
function paceZones(): Zone[] {
  const vh = window.innerHeight;
  const zones: Zone[] = [];
  document.querySelectorAll<HTMLElement>("[data-scroll-pace]").forEach((el) => {
    const pace = Number(el.dataset.scrollPace);
    if (!(pace > 0 && pace < 1) || !el.offsetHeight) return; // ascunsă (pe mobil) sau fără efect
    const [top, bottom] = pageSpan(el); // fără transformările animațiilor de intrare
    const sticky = stickyEnd(el, top) !== null;
    zones.push({ a: sticky ? top : top - vh / 2, b: bottom - vh / 2, pace });
  });
  return zones;
}

const smoothstep = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

/** Viteza la poziția `y`, față de cea obișnuită: 1 în afara zonelor; la marginile lor coboară și urcă lin, pe `ramp` pixeli. */
function paceAt(y: number, zones: Zone[], ramp: number) {
  let pace = 1;
  for (const z of zones) {
    const inside = Math.min(smoothstep((y - z.a) / ramp + 0.5), smoothstep((z.b - y) / ramp + 0.5));
    pace = Math.min(pace, 1 - (1 - z.pace) * inside);
  }
  return pace;
}

/**
 * Pasul de la `from` la `to`. Durata: o secundă plus cam un ecran pe secundă, între 1,5 și 6 secunde,
 * plus timpul în plus al zonelor `data-scroll-pace` (o zonă la „0.4” cere de 2,5 ori mai mult timp).
 * `along` duce progresul mișcării în progres pe pagină: butonul încetinește lin când intră într-o zonă
 * și își reia viteza după ea, ca un om care citește o listă și apoi derulează mai departe.
 */
function plan(from: number, to: number) {
  const vh = window.innerHeight;
  const dist = Math.abs(to - from);
  const zones = to > from ? paceZones() : []; // spre „Sus” fără opriri din ochi
  // Blocul lent e ultimul dinaintea opririi (se termină cu cel mult ~0,3 ecrane înainte): butonul nu mai
  // accelerează după el, ci frânează direct din viteza lui, până la oprire
  for (const z of zones) if (z.b < to && to - z.b < vh * 0.8) z.b = to + vh / 4;
  // Drumul „cântărit”: un pixel dintr-o zonă la „0.4” contează cât 2,5 pixeli
  const N = 400;
  const w = new Float64Array(N + 1);
  let prev = 1 / paceAt(from, zones, vh / 2);
  for (let i = 1; i <= N; i++) {
    const next = 1 / paceAt(from + ((to - from) * i) / N, zones, vh / 2);
    w[i] = w[i - 1] + ((prev + next) / 2) * (dist / N);
    prev = next;
  }
  const total = w[N];
  const along = (p: number) => {
    if (p <= 0 || p >= 1 || !(total > 0)) return Math.min(Math.max(p, 0), 1);
    const target = p * total;
    let lo = 0;
    let hi = N;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (w[mid] < target) lo = mid;
      else hi = mid;
    }
    return (lo + (target - w[lo]) / (w[hi] - w[lo])) / N;
  };
  const duration = Math.min(6, Math.max(1.5, 1 + dist / vh)) + (total - dist) / vh;
  return { duration, along };
}

/**
 * Opririle butonului, câte una pe secțiune (și footerul), în pixeli de la începutul paginii:
 * de regulă începutul secțiunii; la Manifest (`data-scroll-pin`) finalul animației, ca fraza să apară
 * întreagă dintr-o singură apăsare; la Despre și Contact (`data-scroll-center`) secțiunea la mijlocul ecranului.
 */
function collectStops(max: number) {
  const vh = window.innerHeight;
  const y = window.scrollY;
  const stops: number[] = [];
  document.querySelectorAll<HTMLElement>("main > section, main > article, main ~ footer").forEach((el) => {
    const top = el.getBoundingClientRect().top + y;
    const pinEnd = el.dataset.scrollPin !== undefined ? stickyEnd(el, top) : null;
    stops.push(pinEnd ?? centeredStop(el) ?? top);
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
 * se oprește la următoarea, ca un scroll făcut de mână. La finalul paginii devine „Sus”:
 * aceeași mărime, cu cuvântul la mijloc.
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
    const motion = isHeading() ? chained : natural;
    const base = scrollTarget();
    if (base >= max - 4) {
      const duration = Math.min(3, Math.max(1.5, 1.2 + window.scrollY / (vh * 6)));
      scrollToY(0, duration, motion(duration));
      return;
    }
    let target = collectStops(max).find((s) => s > base + 8) ?? max;
    // Dacă după oprire mai rămâne doar o bucată mică de pagină (finalul footerului), mergem până jos
    if (max - target < vh * 0.6) target = max;
    const { duration, along } = plan(window.scrollY, target);
    const ease = motion(duration);
    scrollToY(target, duration, (t) => along(ease(t)));
  };

  const { dark, end, scrollable } = view;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={end ? scrollStep.ariaTop : scrollStep.aria}
      style={{ "--d": "1400ms" } as CSSProperties}
      className={`hero-fade fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-40 grid h-12 min-w-12 place-items-center rounded-full border backdrop-blur transition-[background-color,border-color,color,opacity] duration-500 md:right-[clamp(1.25rem,4.5vw,4.5rem)] md:bottom-8 md:left-auto md:px-5 ${
        dark ? "border-paper/20 bg-ink/80 text-paper hover:border-paper/50" : "border-rule bg-paper/90 text-ink hover:border-ink/40"
      } ${scrollable ? "" : "pointer-events-none opacity-0"}`}
    >
      {/* Cele două fețe stau în aceeași celulă: butonul își păstrează mărimea, iar la final „Sus” apare la mijloc */}
      <span
        aria-hidden="true"
        className={`col-start-1 row-start-1 flex items-center gap-3 transition-opacity duration-500 ${end ? "opacity-0" : ""}`}
      >
        <span className="label hidden md:inline">{scrollStep.label}</span>
        <ArrowRight className="size-[18px] rotate-90 md:hidden" />
        <span className={`relative hidden h-5 w-px overflow-hidden md:block ${dark ? "bg-paper/25" : "bg-ink/15"}`}>
          <span className="scroll-cue absolute inset-x-0 top-0 block h-1/3 bg-current" />
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`label col-start-1 row-start-1 transition-opacity duration-500 ${end ? "" : "opacity-0"}`}
      >
        {scrollStep.labelTop}
      </span>
    </button>
  );
}
