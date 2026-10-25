import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type LandingScreenProps = {
  onStart: () => void;
  onSkip: () => void;
};

export function LandingScreen({ onStart, onSkip }: LandingScreenProps) {
  return (
    <section className="relative h-full min-h-0 w-full overflow-hidden animate-fade-in">
      <SceneImage
        src="/images/landing-bg.png"
        alt="보랏빛 달과 수련꽃 연못, 전통 정자가 있는 수월재 밤 풍경"
        priority
        className="object-cover object-center"
      />

      <div
        className="safe-pad-x absolute inset-x-0 top-0 z-10 flex justify-end"
        style={{
          paddingTop:
            "max(1.25rem, calc(0.5rem + env(safe-area-inset-top, 0px)))",
        }}
      >
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full border border-[#d4af37]/55 bg-[#1a0b2e]/55 px-3.5 py-1.5 text-xs text-white/90 backdrop-blur-sm transition active:scale-95"
        >
          건너뛰기
        </button>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
        <div className="flex flex-col items-center text-center">
          <div
            aria-hidden
            className="mb-3 text-2xl text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]"
          >
            ❈
          </div>
          <div className="rounded-[28px] border border-[#d4af37]/55 bg-[#12081f]/50 px-10 py-7 shadow-[0_0_40px_rgba(26,11,46,0.45)] backdrop-blur-[2px]">
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
              수월재
            </h1>
            <p className="mt-2 font-[family-name:var(--font-display)] text-lg tracking-[0.35em] text-white/90">
              水月齋
            </p>
          </div>
          <p className="mt-5 max-w-[260px] break-keep text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
            달빛 아래 피어나는 운명의 이야기
          </p>
        </div>
      </div>

      <div
        className="safe-pad-x absolute inset-x-0 bottom-0 z-10 flex justify-center"
        style={{
          paddingBottom:
            "max(2.75rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
        }}
      >
        <PrimaryButton onClick={onStart}>시작하기 →</PrimaryButton>
      </div>
    </section>
  );
}
