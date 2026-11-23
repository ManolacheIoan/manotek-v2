/**
 * Ilustrațiile de servicii, desenate de mână în SVG.
 *
 * Pânza: 320 × 320. Cercul din spate o umple (centru 160,160, raza 160), așa că
 * marginea stângă a ilustrației coincide cu marginea cercului și se aliniază
 * cu textul de dedesubt. Fiecare desen stă centrat în cerc, la aceeași mărime.
 *
 * Ierarhia liniilor: contururi „ink” (1,25px), detalii „stone” (1px), un accent „ochre”.
 * Ordinea contează: elementele de mai jos acoperă ce e desenat înainte.
 */

export type StrokeTone = "ink" | "stone" | "ochre";
export type FillTone = "paper" | "rule" | "ink" | "ochre";

export type ArtItem =
  | { kind: "stroke"; d: string; tone: StrokeTone }
  | { kind: "fill"; d: string; tone: FillTone };

export type ArtName = "presence" | "video" | "offers" | "ads" | "systems" | "care";

/**
 * `fit` mută (x, y) și scalează (s, în jurul centrului) desenul, pentru ca toate cele șase
 * să stea la fel în cerc: centrate optic și cu aceeași greutate. Umbra se mută odată cu desenul.
 */
export type Art = { fit?: { x?: number; y?: number; s?: number }; items: ArtItem[] };

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0Z`;

const rrect = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;

const ink = (d: string): ArtItem => ({ kind: "stroke", d, tone: "ink" });
const stone = (d: string): ArtItem => ({ kind: "stroke", d, tone: "stone" });
const gold = (d: string): ArtItem => ({ kind: "stroke", d, tone: "ochre" });
const fill = (d: string, tone: FillTone = "paper"): ArtItem => ({ kind: "fill", d, tone });

/** Cercul din spate, comun tuturor; îl desenează componenta. */
export const BACKDROP = circle(160, 160, 160);

/** Umbra de sub obiect, care îl așază pe suprafață. */
const shadow = (cx: number, cy: number, rx: number) => fill(ellipse(cx, cy, rx, 7), "rule");

/* Arcuri de rază (stânga și dreapta), centrate pe ilustrație */
const reach = (r: number) => {
  const c = 0.819 * r;
  const s = 0.574 * r;
  return `M${160 + c} ${160 - s}A${r} ${r} 0 0 1 ${160 + c} ${160 + s}M${160 - c} ${160 - s}A${r} ${r} 0 0 0 ${160 - c} ${160 + s}`;
};

/* Ștampilele de pe cardul de fidelitate */
const stampX = [178, 200, 222, 244, 266];

export const ART: Record<ArtName, Art> = {
  /* Prezență online: o vitrină găsită pe hartă */
  presence: {
    items: [
      shadow(160, 262, 112),
      ink("M52 258H268"),
      ink("M72 258V128H248V258"),
      ink(`M64 128${" a12 9 0 0 0 24 0".repeat(8)}`),
      ink("M70 110H250M70 110L64 128M250 110L256 128"),
      stone("M88 110V128M112 110V128M136 110V128M160 110V128M184 110V128M208 110V128M232 110V128"),
      ink(rrect(86, 150, 64, 52, 2)),
      stone("M118 150V202M86 176H150"),
      ink(rrect(176, 150, 48, 108, 2)),
      stone(circle(214, 206, 2)),
      stone(ellipse(160, 104, 16, 3.5)),
      gold("M160 100c-16-18-24-29-24-39a24 24 0 0 1 48 0c0 10-8 21-24 39Z"),
      gold(circle(160, 61, 8)),
    ],
  },

  /* Video și foto: un aparat foto */
  video: {
    fit: { y: -12, s: 1.04 },
    items: [
      shadow(160, 250, 104),
      ink(rrect(62, 108, 196, 128, 18)),
      ink("M110 108V96a6 6 0 0 1 6-6H174a6 6 0 0 1 6 6V108"),
      ink(rrect(206, 96, 34, 12, 4)),
      stone(rrect(78, 122, 26, 14, 3)),
      stone("M80 156V216M88 156V216"),
      stone(circle(236, 126, 3)),
      ink(circle(160, 172, 50)),
      ink(circle(160, 172, 39)),
      gold(circle(160, 172, 24)),
      stone("M148 162a15 15 0 0 1 10-9"),
    ],
  },

  /* Campanii și oferte: cafeaua și cardul de fidelitate */
  offers: {
    fit: { x: -6, y: -8 },
    items: [
      shadow(124, 258, 86),
      ink(rrect(150, 74, 140, 92, 10)),
      stone("M166 94H226M166 106H206"),
      ...stampX.flatMap((x) => [stone(circle(x, 128, 7)), stone(circle(x, 150, 7))]),
      ...stampX.map((x) => fill(circle(x, 128, 2.6), "ink")),
      ...stampX.slice(0, 4).map((x) => fill(circle(x, 150, 2.6), "ink")),
      fill(circle(266, 150, 7), "ochre"),
      ink(ellipse(124, 246, 72, 11)),
      fill("M78 168L86 228Q88 240 100 240H148Q160 240 162 228L170 168A46 9 0 0 0 78 168Z"),
      ink(ellipse(124, 168, 46, 9)),
      ink("M78 168L86 228Q88 240 100 240H148Q160 240 162 228L170 168"),
      stone("M86 169a38 5.5 0 0 0 76 0"),
      ink("M167 182c22-2 25 32 -3 36"),
      stone("M108 150c-7-8 7-12 0-22c-5-7 3-12 0-18M124 146c-7-8 7-12 0-22c-5-7 3-12 0-18M140 150c-7-8 7-12 0-22c-5-7 3-12 0-18"),
    ],
  },

  /* Reclame plătite: o postare sponsorizată care ajunge departe */
  ads: {
    fit: { y: -6 },
    items: [
      shadow(160, 266, 66),
      stone(reach(120)),
      stone(reach(96)),
      gold(reach(72)),
      // telefonul: 104 × 200, proporția unui telefon real (nu mai lung)
      fill(rrect(108, 60, 104, 200, 16)),
      ink(rrect(108, 60, 104, 200, 16)),
      stone("M146 72H174M146 248H174"),
      stone(circle(127, 96, 6)),
      stone("M139 93H180M139 100H160"),
      ink(rrect(120, 110, 80, 60, 5)),
      // munții pornesc și se opresc pe laturile drepte ale pozei, nu în colțurile rotunjite
      ink("M120 162L140 136L153 150L165 140L200 164"),
      stone(circle(184, 125, 7)),
      stone("M120 184H190M120 194H170"),
      ink(rrect(120, 208, 80, 20, 10)),
      stone("M146 218H174"),
    ],
  },

  /* Sisteme la comandă: stocul pe ecran și coletul */
  systems: {
    fit: { x: -1, y: -8 },
    items: [
      shadow(150, 250, 112),
      ink(rrect(58, 78, 170, 112, 8)),
      ink("M58 190H228L244 204H42Z"),
      stone("M128 197H158"),
      stone("M74 96H110"),
      stone("M74 172H212"),
      ink(rrect(82, 128, 14, 44, 2)),
      ink(rrect(106, 110, 14, 62, 2)),
      gold(rrect(130, 142, 14, 30, 2)),
      ink(rrect(154, 118, 14, 54, 2)),
      ink(rrect(178, 102, 14, 70, 2)),
      fill("M212 186L228 172H284V228L268 242H212Z"),
      ink("M212 186H268V242H212Z"),
      ink("M212 186L228 172H284L268 186"),
      ink("M284 172V228L268 242"),
      stone("M256 172L240 186V202"),
      stone(rrect(220, 214, 22, 14, 2)),
    ],
  },

  /* Mentenanță și monitorizare: pulsul site-ului */
  care: {
    fit: { x: -5, y: -9 },
    items: [
      shadow(160, 262, 104),
      ink(rrect(48, 70, 224, 156, 10)),
      ink("M48 92H272"),
      stone(`${circle(62, 81, 3)}${circle(73, 81, 3)}${circle(84, 81, 3)}`),
      stone(rrect(104, 75, 120, 12, 6)),
      stone("M62 204H258"),
      gold("M62 162H112L124 128L140 196L152 146L162 162H258"),
      fill("M258 194L282 203V220C282 236 271 247 258 253C245 247 234 236 234 220V203Z"),
      ink("M258 194L282 203V220C282 236 271 247 258 253C245 247 234 236 234 220V203Z"),
      ink("M247 222L255 230L270 214"),
    ],
  },
};
