type CinematicLineProps = {
  children: React.ReactNode;
  className?: string;
};

/** Drama/story-style subtitle overlay — no speech bubble chrome. */
export function CinematicLine({ children, className = "" }: CinematicLineProps) {
  return (
    <div
      className={`animate-fade-in mx-auto w-full max-w-[340px] rounded-2xl bg-black/45 px-5 py-3.5 text-center backdrop-blur-[2px] ${className}`}
    >
      <p className="break-keep text-[17px] font-medium leading-relaxed tracking-wide break-words text-[#f7f1e6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
        {children}
      </p>
    </div>
  );
}
