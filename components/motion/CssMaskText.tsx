import { type CSSProperties, Fragment } from "react";
import { toWords } from "@/lib/rich";

type Tag = "h1" | "h2" | "p";

/**
 * Titlu care urcă din mască, cuvânt cu cuvânt, doar cu CSS: pornește la prima
 * randare, fără să aștepte JavaScript. Pentru titlurile de la începutul paginii.
 */
export function CssMaskText({
  text,
  as: Comp = "h1",
  id,
  className,
  emClassName = "italic text-ochre",
  delay = 120,
  stagger = 45,
}: {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  emClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = toWords(text);
  return (
    <Comp id={id} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask">
            <span className="css-rise" style={{ "--d": `${delay + i * stagger}ms` } as CSSProperties}>
              {w.parts.map((p, j) =>
                p.em ? (
                  <em key={j} className={emClassName}>
                    {p.text}
                  </em>
                ) : (
                  <Fragment key={j}>{p.text}</Fragment>
                ),
              )}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Comp>
  );
}
