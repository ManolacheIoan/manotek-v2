"use client";

import { useSyncExternalStore } from "react";

export const FINE_POINTER = "(hover: hover) and (pointer: fine)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
export const DESKTOP = "(min-width: 64rem)";

const subscribers = new Map<string, (cb: () => void) => () => void>();

function subscribeTo(query: string) {
  let fn = subscribers.get(query);
  if (!fn) {
    fn = (cb: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    };
    subscribers.set(query, fn);
  }
  return fn;
}

/**
 * Media query sigur la hidratare: pe server (și la prima randare în browser)
 * întoarce `serverValue`, apoi valoarea reală.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeTo(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Desktop cu mouse și fără preferința de mișcare redusă: cursor, efect magnetic. */
export function useFinePointer() {
  return useMediaQuery(`${FINE_POINTER} and (prefers-reduced-motion: no-preference)`);
}

export function useReducedMotionPref() {
  return useMediaQuery(REDUCED_MOTION);
}
