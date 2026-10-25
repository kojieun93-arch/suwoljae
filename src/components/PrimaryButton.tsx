type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
};

/** Landing/primary CTA — matches cinematic pill language. */
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
      className={`relative w-full max-w-[360px] overflow-hidden rounded-full border border-white/35 bg-[#2a1a38]/75 px-6 py-4 text-base font-medium tracking-wide text-[#f7f1e6] shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}
