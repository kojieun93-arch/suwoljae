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
      className={`relative w-full max-w-[320px] overflow-hidden rounded-full border border-[#d4af37]/85 bg-gradient-to-b from-[#3d2452] via-[#2a1538] to-[#160a22] px-6 py-3.5 text-base font-medium tracking-wide text-white shadow-[0_0_22px_rgba(80,40,100,0.5)] transition active:scale-[0.98] ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#d4af37]"
      >
        ❋
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#d4af37]"
      >
        ❋
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
