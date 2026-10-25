import { LandingBackground } from "@/components/backgrounds/LandingBackground";
import { PrimaryButton } from "@/components/PrimaryButton";

type LandingScreenProps = {
  onStart: () => void;
  onSkip: () => void;
};

export function LandingScreen({ onStart, onSkip }: LandingScreenProps) {
  return (
    <section className="relative flex h-full flex-col">
      <LandingBackground />

      <div className="relative z-10 flex items-start justify-end p-4 pt-5">
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full border border-white/25 bg-black/35 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-sm transition active:scale-95"
        >
          건너뛰기
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-8">
        <div className="animate-fade-in flex flex-col items-center text-center">
          <div className="mb-3 text-2xl text-[color:var(--suwol-gold)] drop-shadow-[0_0_8px_rgba(212,175,55,0.45)]">
            ❈
          </div>
          <div className="rounded-2xl border border-[color:var(--suwol-gold)]/50 bg-black/25 px-8 py-6 backdrop-blur-[2px]">
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
              수월재
            </h1>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg tracking-[0.35em] text-white/85">
              水月齋
            </p>
          </div>
          <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-white/80">
            달빛 아래 피어나는 운명의 이야기
          </p>
        </div>
      </div>

      <div className="relative z-10 flex justify-center px-6 pb-10">
        <PrimaryButton onClick={onStart}>시작하기 →</PrimaryButton>
      </div>
    </section>
  );
}
