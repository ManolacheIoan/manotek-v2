"use client";

/** Anul curent; în browser se recalculează, chiar dacă site-ul a fost construit anul trecut. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
