import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type IntroScene2Props = {
  onContinue: () => void;
};

export function IntroScene2({ onContinue }: IntroScene2Props) {
  return (
    <section className="relative h-full w-full animate-fade-in">
      <SceneImage
        src="/images/intro-2.jpg"
        alt="수련이 금빛 장식을 들고 미소 짓는 장면"
        priority
      />

      <div className="sr-only" aria-live="polite">
        <p>네 팔자에 남들이 모르는 비밀 하나 있더라.</p>
        <p>궁금하지? 그럼, 이리 와.</p>
      </div>

      <PrimaryButton hotspot onClick={onContinue}>
        내 운명 보러 가기 →
      </PrimaryButton>
    </section>
  );
}
