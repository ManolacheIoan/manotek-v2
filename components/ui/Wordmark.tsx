/** Wordmark-ul „Manotek”, cu „tek” în italic. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif text-[1.55rem] leading-none tracking-[-0.02em] ${className}`}>
      Mano<span className="italic">tek</span>
    </span>
  );
}
