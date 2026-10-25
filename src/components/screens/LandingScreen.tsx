import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type LandingScreenProps = {
  onStart: () => void;
  onSkip: () => void;
};

export function LandingScreen({ onStart, onSkip }: LandingScreenProps) {
  return (
    <section className="relative flex h-full w-full flex-col animate-fade-in">
      <SceneImage
        src="/images/landing-bg.png"
        alt="보랏빛 달과 연꽃 연못, 전통 정자가 있는 수월재 밤 풍경"
        priority
        className="object-center"
      />

      <div className="relative z-10 flex items-start justify-end p-4 pt-5">
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full border border-[#d4af37]/55 bg-[#1a0b2e]/55 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-sm transition active:scale-95"
        >
          건너뛰기
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-4">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 text-2xl text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]">
            ❈
          </div>
          <div className="rounded-[28px] border border-[#d4af37]/55 bg-[#12081f]/45 px-10 py-7 shadow-[0_0_40px_rgba(26,11,46,0.45)] backdrop-blur-[2px]">
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
              수월재
            </h1>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg tracking-[0.35em] text-white/90">
              水月齋
            </p>
          </div>
          <p className="mt-5 max-w-[260px] text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
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
