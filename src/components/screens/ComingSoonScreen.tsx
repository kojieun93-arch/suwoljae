import { PrimaryButton } from "@/components/PrimaryButton";

type ComingSoonScreenProps = {
  onRestart: () => void;
};

export function ComingSoonScreen({ onRestart }: ComingSoonScreenProps) {
  return (
    <section className="relative flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_30%,#2a1450_0%,#0d0618_70%)] px-6 text-center">
      <p className="mb-2 text-sm tracking-[0.2em] text-[color:var(--suwol-gold)]">
        水月齋
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl text-white">
        곧 이어집니다
      </h2>
      <p className="mt-3 max-w-[260px] text-sm leading-relaxed text-white/70">
        온보딩과 사주 화면은 다음 단계에서 연결됩니다.
      </p>
      <div className="mt-10 w-full max-w-[320px]">
        <PrimaryButton onClick={onRestart}>처음으로 돌아가기</PrimaryButton>
      </div>
    </section>
  );
}
