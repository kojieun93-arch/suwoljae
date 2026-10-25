type IntroBackgroundProps = {
  variant?: "table" | "closeup";
};

/** Temporary warm interior backdrop for intro dialogue scenes. */
export function IntroBackground({ variant = "table" }: IntroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,#5a2a4a_0%,#2a1030_40%,#120818_100%)]" />

      {/* Soft candle glow */}
      <div
        className={`animate-soft-glow absolute rounded-full bg-[radial-gradient(circle,rgba(255,200,120,0.45)_0%,transparent_70%)] ${
          variant === "table"
            ? "bottom-[22%] left-[55%] h-48 w-48"
            : "top-[35%] right-[10%] h-56 w-56"
        }`}
      />

      {/* Character placeholder silhouette */}
      <div className="absolute inset-x-0 bottom-0 top-[8%] flex items-end justify-center">
        <div className="relative h-[78%] w-[78%] max-w-[340px]">
          <div className="absolute inset-x-[18%] top-[8%] h-[55%] rounded-[45%] bg-gradient-to-b from-[#3a1a2e]/80 via-[#2a1020]/70 to-transparent" />
          <div className="absolute left-1/2 top-[6%] h-28 w-28 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#5a3048] to-[#2a1528] opacity-90" />
          <div className="absolute left-1/2 top-[4%] h-16 w-40 -translate-x-1/2 rounded-full bg-[#1a0a18]/80 blur-[1px]" />
          {/* Purple hair ornament hint */}
          <div className="absolute left-[58%] top-[10%] h-3 w-3 rounded-full bg-[#c47ab0] shadow-[0_0_10px_#c47ab0]" />
          <div className="absolute left-[62%] top-[14%] h-2 w-2 rounded-full bg-[#d4af37]" />

          {variant === "table" && (
            <>
              {/* Table surface */}
              <div className="absolute inset-x-[5%] bottom-[8%] h-16 rounded-t-2xl bg-gradient-to-b from-[#3a2418] to-[#1a100c]" />
              {/* Cat placeholder */}
              <div className="absolute bottom-[18%] left-[18%] h-10 w-14 rounded-[40%] bg-[#1a1a1a]">
                <div className="absolute -top-2 left-2 h-3 w-2 rotate-[-20deg] rounded-t-full bg-[#1a1a1a]" />
                <div className="absolute -top-2 left-5 h-3 w-2 rotate-[20deg] rounded-t-full bg-[#1a1a1a]" />
                <div className="absolute right-1 top-2 h-4 w-5 rounded-full bg-white/90" />
              </div>
              {/* Candle */}
              <div className="absolute bottom-[22%] right-[28%] h-8 w-2 rounded-sm bg-[#f0d9a0]">
                <div className="absolute -top-3 left-1/2 h-3 w-2 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#ffe08a,#ff9a3c)] blur-[1px]" />
              </div>
            </>
          )}

          {variant === "closeup" && (
            <div className="absolute right-[18%] top-[28%] h-16 w-4 rotate-12 rounded-full bg-gradient-to-b from-[#d4af37] to-[#8a6a20] shadow-[0_0_12px_rgba(212,175,55,0.5)]" />
          )}
        </div>
      </div>

      {/* Bottom vignette for dialogue readability */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
    </div>
  );
}
