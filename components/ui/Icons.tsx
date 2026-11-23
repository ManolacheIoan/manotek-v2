/** Iconițe desenate de mână: linie fină, capete rotunde. */

type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight({ className = "size-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15.5M14 6.5 19.5 12 14 17.5" />
    </svg>
  );
}

export function ArrowUp({ className = "size-4" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20V4.5M6.5 10 12 4.5 17.5 10" />
    </svg>
  );
}

export function Mail({ className = "size-5" }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 6.5h17v11h-17z" />
      <path d="m4 7 8 6.2L20 7" />
    </svg>
  );
}

export function WhatsApp({ className = "size-5" }: P) {
  // Contur desenat, nu sigla plină: un balon de conversație cu receptor
  return (
    <svg {...base} className={className}>
      <path d="M4.2 19.8 5.3 16a8.2 8.2 0 1 1 3 2.9Z" />
      <path d="M9.3 8.6c.3-.5.8-.5 1-.1l.7 1.5c.1.3 0 .6-.2.8l-.5.5c.5 1.1 1.4 2 2.5 2.5l.5-.5c.2-.2.5-.3.8-.2l1.5.7c.4.2.4.7-.1 1-.6.5-1.4.8-2.2.5a7.4 7.4 0 0 1-4.5-4.5c-.3-.8 0-1.6.5-2.2Z" />
    </svg>
  );
}

/** „+” din două linii; se rotește la 45° când e deschis. */
export function Plus({ open, className = "size-5" }: P & { open?: boolean }) {
  return (
    <svg
      {...base}
      className={`${className} transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-45" : ""}`}
    >
      <path d="M12 4v16M4 12h16" />
    </svg>
  );
}
