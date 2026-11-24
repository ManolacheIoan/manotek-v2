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

/** Ținta unei derulări pornite de `scrollToY`, cât timp e în curs. */
let heading: number | null = null;

/** Poziția spre care merge pagina: ținta animației în curs, dacă există, altfel poziția actuală. */
export function scrollTarget() {
  if (!lenis) return window.scrollY;
  // În timpul unei derulări programate, Lenis raportează poziția curentă, nu ținta;
  // dacă utilizatorul a intervenit cu rotița, ținta lui are prioritate.
  if (heading !== null && lenis.isScrolling === "smooth" && lenis.targetScroll === lenis.animatedScroll) return heading;
  return lenis.targetScroll;
}

/** E în curs o derulare pornită de `scrollToY`? */
export function isHeading() {
  return heading !== null && scrollTarget() === heading;
}

/** Derulează lin până la `y`; fără Lenis (mișcare redusă) sare direct. */
export function scrollToY(y: number, duration: number, easing: (t: number) => number) {
  if (!lenis) {
    window.scrollTo({ top: y, behavior: "auto" });
    return;
  }
  heading = y;
  lenis.scrollTo(y, {
    duration,
    easing,
    onComplete: () => {
      heading = null;
    },
  });
}
