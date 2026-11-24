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

/** Spațiul minim lăsat deasupra și dedesubt când o secțiune e așezată la mijlocul ecranului. */
const MARGIN = 32;

/**
 * Unde începe și unde se termină un element, în pixeli de la începutul paginii, după așezarea lui,
 * fără transformările animațiilor: un text care încă urcă la locul lui nu mută oprirea.
 */
function span(el: HTMLElement): [number, number] {
  let top = 0;
  for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) top += e.offsetTop;
  return [top, top + el.offsetHeight];
}

/**
 * Oprirea unei secțiuni `data-scroll-center` (Despre, Contact), când pagina ajunge la ea singură
 * (butonul „Derulează” sau un link din meniu): conținutul stă la mijlocul ecranului, cu același spațiu
 * gol deasupra și dedesubt. Pe ecranele unde nu încape:
 *  - cu `data-scroll-focus` (formularul de contact), formularul se vede întreg: sub titlu, dacă au loc
 *    amândouă, altfel singur, la mijloc (textul de deasupra lui nu rămâne tăiat pe jumătate la marginea de sus);
 *  - altfel, conținutul pornește de aproape de marginea de sus.
 * `null` pentru celelalte secțiuni: oprirea rămâne la începutul lor.
 */
export function centeredStop(section: HTMLElement): number | null {
  if (section.dataset.scrollCenter === undefined) return null;
  const vh = window.innerHeight;
  const room = vh - 2 * MARGIN;

  // Conținutul, fără spațiile goale de sus și de jos ale secțiunii
  const cs = getComputedStyle(section);
  const [top, bottom] = span(section);
  const [c0, c1] = [top + parseFloat(cs.paddingTop), bottom - parseFloat(cs.paddingBottom)];
  if (c1 - c0 <= room) return (c0 + c1 - vh) / 2;

  const focus = section.querySelector<HTMLElement>("[data-scroll-focus]");
  if (focus) {
    const [f0, f1] = span(focus);
    const heading = section.querySelector("h2");
    // Titlul sus, formularul întreg sub el
    if (heading && f1 - span(heading)[0] <= room) return span(heading)[0] - MARGIN;
    // Doar formularul, la mijloc; ce e deasupra lui se vede întreg sau deloc, fără rânduri tăiate sus
    if (f1 - f0 <= room) {
      let stop = (f0 + f1 - vh) / 2;
      section.querySelectorAll<HTMLElement>("h2, p, ul").forEach((block) => {
        const [b0, b1] = span(block);
        if (b1 <= f0 && b0 < stop && stop < b1) stop = Math.min(b1, f0 - MARGIN);
      });
      return stop;
    }
  }
  return c0 - MARGIN;
}

/** Derulează lin la o secțiune și îi dă focus, pentru cei care navighează din tastatură. */
export function scrollToElement(el: HTMLElement, hash?: string) {
  const stop = centeredStop(el);
  if (lenis) {
    lenis.start();
    lenis.scrollTo(stop ?? el, { duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else if (stop !== null) {
    window.scrollTo({ top: stop, behavior: "auto" });
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
