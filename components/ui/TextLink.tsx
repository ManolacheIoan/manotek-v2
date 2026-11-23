import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Link extern: se deschide într-o filă nouă */
  external?: boolean;
  arrow?: boolean;
  /** Linie statică dedesubt (pentru linkuri din text) */
  staticLine?: boolean;
  onClick?: () => void;
};

/** Link cu subliniere care se desenează de la stânga la dreapta. */
export function TextLink({ href, children, className = "", external, arrow, staticLine, onClick }: Props) {
  const cls = `u-link ${staticLine ? "u-link--static" : ""} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight className="u-arrow size-[1em] shrink-0" /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {content}
        <span className="sr-only"> (se deschide într-o filă nouă)</span>
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} onClick={onClick}>
      {content}
    </a>
  );
}
