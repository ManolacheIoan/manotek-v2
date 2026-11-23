"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useFinePointer } from "@/lib/hooks";

type State = { visible: boolean; hover: boolean; text: boolean; dark: boolean };
const initial: State = { visible: false, hover: false, text: false, dark: false };

/**
 * Cursor discret, doar pe desktop cu mouse: un punct care devine un cerc
 * peste elementele interactive. Dispare peste câmpurile de text.
 */
export function Cursor() {
  const enabled = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.4 });
  const [state, setState] = useState<State>(initial);
  const last = useRef<State>(initial);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const commit = (next: State) => {
      const p = last.current;
      if (p.visible !== next.visible || p.hover !== next.hover || p.text !== next.text || p.dark !== next.dark) {
        last.current = next;
        setState(next);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as Element | null;
      commit({
        visible: true,
        hover: !!t?.closest?.("a, button, [role='tab'], label, [data-cursor='hover']"),
        text: !!t?.closest?.("input, textarea, select"),
        dark: !!t?.closest?.("[data-theme='dark']"),
      });
    };
    const onLeave = () => commit({ ...last.current, visible: false });

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const color = state.dark ? "#FAF8F4" : "#141414";
  const show = state.visible && !state.text;

  return (
    <m.div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[100]" style={{ x: sx, y: sy }}>
      <m.span
        className="absolute -top-1 -left-1 block size-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ scale: state.hover ? 0 : 1, opacity: show ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <m.span
        className="absolute -top-7 -left-7 block size-14 rounded-full border"
        style={{ borderColor: color, backgroundColor: state.dark ? "rgba(250,248,244,0.08)" : "rgba(20,20,20,0.05)" }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: state.hover ? 1 : 0.2, opacity: show && state.hover ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </m.div>
  );
}
