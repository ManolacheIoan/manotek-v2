/** Eticheta mică a unei secțiuni (nu e titlu, doar orientare). */
export function SectionLabel({
  children,
  className = "",
  tone = "light",
}: {
  children: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <p className={`label flex items-center gap-3 self-start ${tone === "dark" ? "text-paper/62" : "text-stone"} ${className}`}>
      <span aria-hidden="true" className={`h-px w-6 ${tone === "dark" ? "bg-paper/40" : "bg-ink/40"}`} />
      {children}
    </p>
  );
}
