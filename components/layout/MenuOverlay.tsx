"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { contact, header, nav, site, whatsappHref } from "@/content/site";
import { EASE } from "@/lib/motion";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { TextLink } from "../ui/TextLink";
import { Wordmark } from "../ui/Wordmark";

/**
 * Meniul pe tot ecranul. Focusul rămâne în meniu cât e deschis;
 * se închide cu Escape, cu „Închide” sau cu click pe un link.
 */
export function MenuOverlay({ onClose }: { onClose: (restoreFocus: boolean) => void }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lockScroll();
    const el = root.current;
    el?.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose(true);
        return;
      }
      if (e.key !== "Tab" || !el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!el.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  return (
    <m.div
      ref={root}
      id="meniu"
      role="dialog"
      aria-modal="true"
      aria-label={header.menu}
      className="fixed inset-0 z-[70] flex flex-col bg-paper"
      initial={{ y: "-100%" }}
      animate={{ y: "0%", transition: { duration: 0.85, ease: EASE } }}
      exit={{ y: "-100%", transition: { duration: 0.75, ease: EASE, delay: 0.1 } }}
    >
      <div className="wrap flex h-[72px] shrink-0 items-center justify-between lg:h-[84px]">
        <Link href="/#top" onClick={() => onClose(false)} className="py-2" aria-label="Manotek, înapoi la început">
          <Wordmark />
        </Link>
        <button
          type="button"
          data-autofocus
          onClick={() => onClose(true)}
          className="flex h-10 items-center gap-3 pl-2 text-[0.875rem] font-medium"
        >
          <span>{header.close}</span>
          <span aria-hidden="true" className="relative block size-7">
            <span className="x-a absolute top-1/2 left-0 h-px w-full bg-current" />
            <span className="x-b absolute top-1/2 left-0 h-px w-full bg-current" />
          </span>
        </button>
      </div>

      <div className="wrap grid-page min-h-0 flex-1 content-between gap-y-12 overflow-y-auto pt-6 pb-10 lg:content-center lg:pb-16" data-lenis-prevent>
        <nav aria-label="Meniu principal" className="col-span-full lg:col-span-8">
          <ol>
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  onClick={() => onClose(false)}
                  className="group flex items-baseline gap-4 py-1 sm:gap-6 lg:py-1.5"
                >
                  <m.span
                    className="w-7 shrink-0 text-[0.8125rem] font-medium text-stone tabular-nums"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.45 + i * 0.06, duration: 0.6 } }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </m.span>
                  <span className="mask transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                    <m.span
                      className="font-serif text-[clamp(2.35rem,1.3rem+4.3vw,5.25rem)] leading-[1.04] font-light tracking-[-0.03em]"
                      initial={{ y: "115%" }}
                      animate={{ y: "0%", transition: { delay: 0.3 + i * 0.06, duration: 0.9, ease: EASE } }}
                    >
                      {item.label}
                    </m.span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <m.aside
          className="col-span-full flex flex-col gap-6 border-t border-rule pt-6 lg:col-span-3 lg:col-start-10 lg:self-end lg:border-t-0 lg:pt-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.8, ease: EASE } }}
        >
          <TextLink href="/audit-gratuit" arrow onClick={() => onClose(false)} className="self-start text-[1.0625rem] font-medium">
            {header.auditLink}
          </TextLink>
          <div>
            <p className="label text-stone">{header.menuWrite}</p>
            <ul className="mt-3 space-y-2 text-[1.0625rem]">
              <li>
                <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>
              </li>
              <li>
                <TextLink href={whatsappHref()} external>
                  {contact.whatsappLabel}
                </TextLink>
              </li>
            </ul>
          </div>
          <p className="font-serif text-[1.75rem] leading-tight font-light italic">{site.tagline}</p>
        </m.aside>
      </div>
    </m.div>
  );
}
