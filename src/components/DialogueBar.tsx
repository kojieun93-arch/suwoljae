type DialogueBarProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

/** Bottom cinematic pill CTA — translucent purple with light border. */
export function DialogueBar({
  children,
  onClick,
  className = "",
}: DialogueBarProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`animate-fade-in w-full max-w-[360px] rounded-full border border-white/35 bg-[#2a1a38]/72 px-6 py-4 text-center text-[16px] font-medium tracking-wide text-[#f7f1e6] shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}
