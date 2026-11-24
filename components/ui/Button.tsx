"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { useFinePointer } from "@/lib/hooks";
import { ArrowRight } from "./Icons";

const variants = {
  /** Auriu cu text alb, pe fundal deschis: la hover urcă negru */
  primary: { root: "bg-ochre-deep text-white", fill: "bg-ink", copy: "text-paper", icon: "group-hover:text-paper group-focus-visible:text-paper" },
  /** Auriu cu text alb, pe fundal închis: la hover urcă crem, textul devine negru */
  "primary-dark": { root: "bg-ochre-deep text-white", fill: "bg-paper", copy: "text-ink", icon: "group-hover:text-ink group-focus-visible:text-ink" },
  /** Contur negru, pe fundal deschis */
  outline: { root: "border border-ink/80 text-ink", fill: "bg-ink", copy: "text-paper", icon: "group-hover:text-paper group-focus-visible:text-paper" },
  /** Contur crem, pe fundal închis */
  "outline-light": { root: "border border-paper/40 text-paper", fill: "bg-paper", copy: "text-ink", icon: "group-hover:text-ink group-focus-visible:text-ink" },
};

const MLink = m.create(Link);

const sizes = {
  md: "h-14 px-7 text-[1rem]",
  sm: "h-10 px-[1.1rem] text-[0.875rem]",
};

type Props = {
  children: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
  extra?: ReactNode;
};

/**
 * Buton cu efect magnetic subtil (doar pe desktop cu mouse) și hover propriu:
 * fundalul urcă de jos, iar textul alunecă în sus și e înlocuit de o copie.
 */
export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  arrow = false,
  disabled,
  className = "",
  extra,
}: Props) {
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });
  const v = variants[variant];

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!fine || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.32);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span aria-hidden="true" className={`btn-fill ${v.fill}`} />
      <span className="btn-roll">
        <span>{children}</span>
        <span aria-hidden="true" className={v.copy}>
          {children}
        </span>
      </span>
      {arrow ? (
        <span aria-hidden="true" className={`btn-icon transition-colors duration-500 ${v.icon}`}>
          <ArrowRight className="size-[1.05em]" />
        </span>
      ) : null}
      {extra}
    </>
  );

  const cls = `btn group ${sizes[size]} ${v.root} ${className}`;
  const style = { x: sx, y: sy };

  if (href?.startsWith("/")) {
    return (
      <MLink href={href} className={cls} style={style} onPointerMove={onMove} onPointerLeave={onLeave} onClick={onClick}>
        {inner}
      </MLink>
    );
  }
  if (href) {
    return (
      <m.a href={href} className={cls} style={style} onPointerMove={onMove} onPointerLeave={onLeave} onClick={onClick}>
        {inner}
      </m.a>
    );
  }
  return (
    <m.button
      type={type}
      className={cls}
      style={style}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {inner}
    </m.button>
  );
}
