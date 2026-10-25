type DialogueBarProps = {
  children: React.ReactNode;
  onClick?: () => void;
  showArrow?: boolean;
  className?: string;
};

export function DialogueBar({
  children,
  onClick,
  showArrow = true,
  className = "",
}: DialogueBarProps) {
  const content = (
    <div className="flex items-start justify-between gap-3">
      <p>{children}</p>
      {showArrow && (
        <span className="mt-0.5 shrink-0 text-white/55" aria-hidden>
          ›
        </span>
      )}
    </div>
  );

  const styles = `animate-fade-in w-full rounded-2xl border border-[#d4af37]/35 bg-[#1a0b2e]/82 px-4 py-4 text-left text-[15px] leading-relaxed text-white/95 backdrop-blur-md transition active:scale-[0.99] ${className}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={styles}>
        {content}
      </button>
    );
  }

  return <div className={styles}>{content}</div>;
}
