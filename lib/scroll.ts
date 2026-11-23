import type Lenis from "lenis";

/** Instanța Lenis (scroll lin). Lipsește când utilizatorul preferă mișcare redusă. */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Oprește scroll-ul paginii (de exemplu, cât e deschis meniul). */
export function lockScroll() {
  if (lenis) lenis.stop();
  else document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  if (lenis) lenis.start();
  else document.documentElement.style.overflow = "";
}

/** Derulează lin la o secțiune și îi dă focus, pentru cei care navighează din tastatură. */
export function scrollToElement(el: HTMLElement, hash?: string) {
  if (lenis) {
    lenis.start();
    lenis.scrollTo(el, { duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ block: "start" });
  }
  if (hash) history.replaceState(null, "", hash);
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
