type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  /** Visually hidden but still clickable — for hotspots over baked-in art UI */
  hotspot?: boolean;
};

export function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
  hotspot = false,
}: PrimaryButtonProps) {
  if (hotspot) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`absolute inset-x-[8%] bottom-[3.5%] z-20 h-[7.5%] rounded-full bg-transparent ${className}`}
        aria-label={typeof children === "string" ? children : "확인"}
      />
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative w-full max-w-[320px] overflow-hidden rounded-full border border-[#c9a84c]/80 bg-gradient-to-b from-[#3a1f4a] via-[#2a1538] to-[#1a0d28] px-6 py-3.5 text-base font-medium tracking-wide text-white shadow-[0_0_20px_rgba(80,40,100,0.45)] transition active:scale-[0.98] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#d4af37]"
      >
        ❋
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#d4af37]"
      >
        ❋
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
