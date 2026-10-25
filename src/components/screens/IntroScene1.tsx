import { SceneImage } from "@/components/SceneImage";

type IntroScene1Props = {
  onNext: () => void;
};

export function IntroScene1({ onNext }: IntroScene1Props) {
  return (
    <section className="relative h-full w-full animate-fade-in">
      <SceneImage
        src="/images/intro-1.jpg"
        alt="수련이 턱을 괴고 앉아 있고, 앞에 흑백 고양이가 있는 장면"
        priority
      />

      <div className="sr-only" aria-live="polite">
        <p>왔어? 생각보다 늦었네.</p>
        <p>뭐, 기다린 건 아니고, ...오늘은 어떤 고민을 들고 온 거야?</p>
      </div>

      {/* Tap the bottom dialogue bar to continue */}
      <button
        type="button"
        onClick={onNext}
        className="absolute inset-x-[4%] bottom-[2.8%] z-20 h-[11%] rounded-2xl bg-transparent"
        aria-label="다음 대사로 이동"
      />
    </section>
  );
}
