"use client";

import { type CSSProperties, Fragment, useEffect, useRef, useState } from "react";

/**
 * Alege rupturile de rând pentru un text scurt astfel încât rândurile să crească
 * „în trepte” de sus în jos (fiecare cel puțin cât cel de deasupra), cât mai pline.
 * Pentru texte mai lungi de `maxLines` rânduri, lasă așezarea naturală.
 */
function stairs(words: string[], widths: number[], space: number, W: number, maxLines: number, fixedLines?: number) {
  const n = words.length;
  const lineW = (i: number, j: number) => {
    let s = 0;
    for (let k = i; k < j; k++) s += widths[k];
    return s + space * (j - i - 1);
  };
  // câte rânduri ar ieși natural
  let lines = 1;
  let cur = 0;
  for (let k = 0; k < n; k++) {
    const add = (cur ? space : 0) + widths[k];
    if (cur && cur + add > W) {
      lines++;
      cur = widths[k];
    } else cur += add;
  }
  if (fixedLines) lines = fixedLines;
  if (lines < 2 || lines > maxLines) return null;

  let best: number[] | null = null;
  let bestCost = Infinity;
  const breaks: number[] = [];
  const search = (start: number, line: number, prev: number, cost: number) => {
    if (line === lines - 1) {
      const w = lineW(start, n);
      if (w > W || w < prev) return;
      const total = cost + (W - w) ** 2;
      if (total < bestCost) {
        bestCost = total;
        best = [...breaks];
      }
      return;
    }
    for (let end = start + 1; end <= n - (lines - 1 - line); end++) {
      const w = lineW(start, end);
      if (w > W) break;
      if (w < prev) continue;
      breaks.push(end);
      search(end, line + 1, w, cost + (W - w) ** 2);
      breaks.pop();
    }
  };
  search(0, 0, 0, 0);
  if (!best) return null;

  const out: string[] = [];
  let start = 0;
  for (const end of [...(best as number[]), n]) {
    out.push(words.slice(start, end).join(" "));
    start = end;
  }
  return out;
}

/** Câte rânduri are acum textul, așa cum l-a randat browserul. */
function renderedLines(el: HTMLElement) {
  const tops = new Set<number>();
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType !== Node.TEXT_NODE) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    for (const r of Array.from(range.getClientRects())) if (r.width > 0) tops.add(Math.round(r.top));
  }
  return tops.size || undefined;
}

/** Text scurt așezat în trepte. Nu-l folosi pentru texte vizibile imediat la încărcare (LCP). */
export function StairText({
  text,
  className,
  style,
  maxLines = 3,
  srPrefix,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  maxLines?: number;
  /** Text citit doar de cititoarele de ecran, înaintea textului (ex. „Exemplu:”) */
  srPrefix?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const lastKey = useRef("");

  useEffect(() => {
    const el = ref.current;
    const ctx = document.createElement("canvas").getContext("2d");
    if (!el || !ctx) return;
    const compute = () => {
      const cs = getComputedStyle(el);
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const ls = parseFloat(cs.letterSpacing) || 0;
      const measure = (s: string) => ctx.measureText(s).width + ls * s.length;
      // marjă de siguranță: măsurarea din canvas poate diferi cu un pixel de randare
      const W = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - 2;
      // se împarte doar la spațiile obișnuite; spațiul neîntreruptibil ține cuvintele împreună
      const words = text.split(/[^\S  ]+/).filter(Boolean);
      // La prima așezare păstrăm exact numărul de rânduri randat de browser:
      // înălțimea nu se schimbă, deci pagina nu „sare” (fără layout shift).
      const fixed = lastKey.current === "" ? renderedLines(el) : undefined;
      const next = W > 0 ? stairs(words, words.map(measure), measure(" "), W, maxLines, fixed) : null;
      const key = next ? next.join("|") : "";
      if (key !== lastKey.current) {
        lastKey.current = key;
        setLines(next);
      }
    };
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    document.fonts?.ready.then(compute);
    return () => ro.disconnect();
  }, [text, maxLines]);

  return (
    <p ref={ref} className={className} style={style}>
      {srPrefix ? <span className="sr-only">{srPrefix} </span> : null}
      {lines
        ? lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 ? <br /> : null}
              {line}
            </Fragment>
          ))
        : text}
    </p>
  );
}
