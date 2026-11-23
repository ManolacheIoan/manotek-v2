"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { header } from "@/content/site";
import { EASE } from "@/lib/motion";
import { Button } from "../ui/Button";
import { Wordmark } from "../ui/Wordmark";
import { MenuOverlay } from "./MenuOverlay";

/**
 * Header: wordmark în stânga; în dreapta doar „Audit gratuit” și „Meniu”.
 * Se ascunde la scroll în jos și reapare la scroll în sus.
 */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  // Pe pagina de audit, butonul duce direct la formular
  const onAudit = usePathname() === "/audit-gratuit";
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = last.current;
    last.current = y;
    setSolid(y > 40);
    if (y < 160) setHidden(false);
    else if (y > prev + 4) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => menuButton.current?.focus({ preventScroll: true }));
  }, []);

  return (
    <>
      <a
        href="#continut"
        className="label fixed top-3 left-3 z-[80] -translate-y-24 bg-ink px-4 py-3 text-paper focus:translate-y-0"
      >
        {header.skip}
      </a>
      <m.header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-rule/80 bg-paper/80 backdrop-blur-md backdrop-saturate-150" : "border-transparent"
        }`}
        animate={{ y: hidden && !open ? "-101%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="wrap flex h-[72px] items-center justify-between lg:h-[84px]">
          <Link href="/#top" aria-label="Manotek, înapoi la început" className="py-2">
            <Wordmark />
          </Link>
          <div className="flex items-center gap-2 sm:gap-6">
            {/* pe ecranele foarte înguste (sub 360px) rămân doar logo-ul și „Meniu” */}
            <span className="max-[359px]:hidden">
              <Button href={onAudit ? "#cerere" : "/audit-gratuit"} size="sm" variant="outline">
                {header.cta}
              </Button>
            </span>
            <button
              ref={menuButton}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="meniu"
              onClick={() => setOpen(true)}
              className="group flex h-10 items-center gap-3 pl-2 text-[0.875rem] font-medium"
            >
              <span>{header.menu}</span>
              <span aria-hidden="true" className="relative block h-[9px] w-7">
                <span className="absolute top-0 right-0 h-px w-full origin-right bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[0.55]" />
                <span className="absolute right-0 bottom-0 h-px w-[55%] origin-right bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-[1.818]" />
              </span>
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>{open ? <MenuOverlay onClose={close} /> : null}</AnimatePresence>
    </>
  );
}
