"use client";

import { cancelFrame, frame } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import { scrollToElement, setLenis } from "@/lib/scroll";

/**
 * Scroll lin cu Lenis, sincronizat cu bucla de cadre a Framer Motion,
 * ca animațiile legate de scroll să meargă în același ritm.
 * Nu pornește deloc dacă utilizatorul preferă mișcare redusă.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.11, stopInertiaOnNavigate: true });
    setLenis(lenis);

    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(update, true);

    // Linkurile către o secțiune de pe aceeași pagină derulează lin (în faza de capturare,
    // înaintea oricărui alt handler, inclusiv cel al lui next/link).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      // „/pagina” și „/pagina/” sunt aceeași pagină (bara finală nu contează)
      const path = (p: string) => p.replace(/\/+$/, "") || "/";
      if (url.origin !== window.location.origin || path(url.pathname) !== path(window.location.pathname) || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      scrollToElement(el, url.hash);
    };
    window.addEventListener("click", onClick, { capture: true });

    return () => {
      window.removeEventListener("click", onClick, { capture: true });
      cancelFrame(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
