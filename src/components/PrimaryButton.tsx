type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

export function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`relative w-full max-w-[320px] overflow-hidden rounded-xl border border-[color:var(--suwol-gold)]/70 bg-gradient-to-r from-[#2a1450] via-[#4a1d6e] to-[#1f0f3d] px-6 py-3.5 text-base font-medium text-white shadow-[0_0_24px_rgba(74,29,110,0.45)] transition active:scale-[0.98] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--suwol-gold)] opacity-80"
      >
        ❋
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--suwol-gold)] opacity-80"
      >
        ❋
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
