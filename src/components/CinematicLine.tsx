type CinematicLineProps = {
  children: React.ReactNode;
  className?: string;
};

/** Film-subtitle style line — no chat bubble / heavy box. */
export function CinematicLine({ children, className = "" }: CinematicLineProps) {
  return (
    <p
      className={`mx-auto max-w-[320px] break-keep text-center text-[clamp(1.25rem,5.2vw,1.625rem)] font-medium leading-relaxed tracking-wide break-words text-[#f7f1e6] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85),0_0_2px_rgba(0,0,0,0.9)] ${className}`}
    >
      {children}
    </p>
  );
}
