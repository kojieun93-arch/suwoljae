import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";
import { SpeechBubble } from "@/components/SpeechBubble";

type IntroScene2Props = {
  onContinue: () => void;
};

export function IntroScene2({ onContinue }: IntroScene2Props) {
  return (
    <section className="relative flex h-full w-full flex-col animate-fade-in">
      <SceneImage
        src="/images/suryeon-intro-2.png"
        alt="수련이 방울을 들고 미소 짓는 장면"
        priority
        className="object-[center_22%]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[16%] bg-gradient-to-b from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[34%] bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-10 pt-14">
        <div className="mx-auto w-full max-w-[300px] space-y-3">
          <SpeechBubble>
            니 팔자에 남들이 모르는 비밀 하나 있더라.
          </SpeechBubble>
          <SpeechBubble delayMs={140}>궁금하제? 그럼 이리 와.</SpeechBubble>
        </div>

        <div className="flex justify-center">
          <PrimaryButton onClick={onContinue}>
            내 운명 보러 가기 →
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
