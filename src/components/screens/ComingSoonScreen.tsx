import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type ComingSoonScreenProps = {
  onRestart: () => void;
};

export function ComingSoonScreen({ onRestart }: ComingSoonScreenProps) {
  return (
    <section className="relative flex h-full w-full animate-fade-in flex-col items-center justify-center overflow-hidden">
      <SceneImage
        src="/images/landing.jpg"
        alt=""
        className="scale-110 blur-[2px]"
      />
      <div className="absolute inset-0 bg-[#0d0618]/72" />

      <div className="relative z-10 flex flex-col items-center px-8 text-center">
        <p className="mb-2 text-sm tracking-[0.28em] text-[#d4af37]">水月齋</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-white">
          곧 이어집니다
        </h2>
        <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/75">
          온보딩과 사주 화면은 다음 단계에서 연결됩니다.
        </p>
        <div className="mt-10 w-full max-w-[320px]">
          <PrimaryButton onClick={onRestart}>처음으로 돌아가기</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
