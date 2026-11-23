import type { ReactNode } from "react";

/** Împarte un text cu *cuvinte în italic* în segmente. */
export function parseRich(text: string) {
  return text.split("*").map((part, i) => ({ text: part, em: i % 2 === 1 }));
}

export type Word = { parts: { text: string; em: boolean }[] };

/**
 * Cuvintele unui text, păstrând italicul. Punctuația lipită de un cuvânt în
 * italic („*locală*.”) rămâne în același cuvânt, fără spațiu.
 */
export function toWords(text: string): Word[] {
  const words: Word[] = [];
  let startNew = true;
  for (const seg of parseRich(text)) {
    // se împarte doar la spațiile obișnuite; spațiul neîntreruptibil ține cuvintele împreună
    for (const token of seg.text.split(/([^\S\u00A0\u202F]+)/)) {
      if (!token) continue;
      if (/^[^\S\u00A0\u202F]+$/.test(token)) {
        startNew = true;
        continue;
      }
      if (startNew || words.length === 0) {
        words.push({ parts: [{ text: token, em: seg.em }] });
      } else {
        words[words.length - 1].parts.push({ text: token, em: seg.em });
      }
      startNew = false;
    }
  }
  return words;
}

/** Afișează textul cu italicul marcat prin steluțe. */
export function Rich({ text, emClassName = "italic" }: { text: string; emClassName?: string }) {
  const out: ReactNode[] = parseRich(text).map((seg, i) =>
    seg.em ? (
      <em key={i} className={emClassName}>
        {seg.text}
      </em>
    ) : (
      seg.text
    ),
  );
  return <>{out}</>;
}
