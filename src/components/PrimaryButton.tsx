type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/** Landing/CTA — translucent deep purple, thin gold border, soft sheen. */
export function PrimaryButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative h-14 w-[88%] max-w-[360px] overflow-hidden rounded-full border border-[#d4af37]/75 bg-gradient-to-b from-[#3a2448]/85 via-[#241430]/88 to-[#160a22]/92 text-[16px] font-medium tracking-wide text-[#f7f1e6] shadow-[0_8px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition active:scale-[0.98] disabled:opacity-70 ${className}`}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#d4af37]"
      >
        ❋
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#d4af37]"
      >
        ❋
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
