import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type LandingScreenProps = {
  onStart: () => void;
  onSkip: () => void;
};

export function LandingScreen({ onStart, onSkip }: LandingScreenProps) {
  return (
    <section className="relative h-full w-full animate-fade-in">
      <SceneImage
        src="/images/landing.jpg"
        alt="수월재 — 보랏빛 달과 연꽃이 핀 연못, 전통 한옥이 보이는 밤 풍경"
        priority
        className="object-top"
      />

      {/* Accessible labels mirrored from the illustration */}
      <h1 className="sr-only">수월재 水月齋</h1>
      <p className="sr-only">달빛 아래 피어나는 운명의 이야기</p>

      {/* Skip hotspot — matches baked-in top-right control */}
      <button
        type="button"
        onClick={onSkip}
        className="absolute right-[5%] top-[2.8%] z-20 h-[4.2%] w-[22%] rounded-full bg-transparent"
        aria-label="건너뛰기"
      />

      <PrimaryButton hotspot onClick={onStart}>
        시작하기 →
      </PrimaryButton>
    </section>
  );
}
