type SpeechBubbleProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
};

export function SpeechBubble({
  children,
  className = "",
  delayMs = 0,
}: SpeechBubbleProps) {
  return (
    <div
      className={`animate-fade-in rounded-2xl bg-white px-4 py-3 text-[15px] leading-relaxed text-[#1a1228] shadow-lg ${className}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
