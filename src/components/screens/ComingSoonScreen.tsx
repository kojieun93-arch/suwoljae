import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";
import type { TopicOption } from "@/lib/consultation";

type ComingSoonScreenProps = {
  onRestart: () => void;
  onBack?: () => void;
  selectedTopic?: TopicOption | null;
};

export function ComingSoonScreen({
  onRestart,
  onBack,
  selectedTopic = null,
}: ComingSoonScreenProps) {
  return (
    <section className="relative flex h-full w-full animate-fade-in flex-col overflow-hidden">
      <SceneImage
        src="/images/landing-bg.png"
        alt=""
        className="scale-110 blur-[2px]"
      />
      <div className="absolute inset-0 bg-[#0d0618]/72" />

      {onBack && (
        <div
          className="safe-pad-x relative z-10 flex items-center"
          style={{
            paddingTop:
              "max(0.85rem, calc(0.4rem + env(safe-area-inset-top, 0px)))",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-xl leading-none text-[#f7f1e6] backdrop-blur-sm transition active:scale-95"
            aria-label="뒤로가기"
          >
            ‹
          </button>
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="mb-2 text-sm tracking-[0.28em] text-[#d4af37]">水月齋</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-white">
          곧 이어집니다
        </h2>
        <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/75">
          선택한 주제로 상담을 이어갈 준비 중입니다.
        </p>
        {selectedTopic && (
          <div className="mt-6 w-full max-w-[280px] rounded-2xl border border-[#d4af37]/45 bg-[#1a0b2e]/65 px-4 py-3 text-left">
            <p className="text-xs tracking-wide text-[#d4af37]/90">선택한 주제</p>
            <p className="mt-1 text-[15px] font-medium text-[#f7f1e6]">
              {selectedTopic.title}
            </p>
            <p className="text-[13px] text-[#f7f1e6]/65">
              {selectedTopic.description}
            </p>
          </div>
        )}
        <div className="mt-10 w-full max-w-[320px]">
          <PrimaryButton onClick={onRestart}>처음으로 돌아가기</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
