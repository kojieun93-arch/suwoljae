import { IntroBackground } from "@/components/backgrounds/IntroBackground";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SpeechBubble } from "@/components/SpeechBubble";

type IntroScene2Props = {
  onContinue: () => void;
};

export function IntroScene2({ onContinue }: IntroScene2Props) {
  return (
    <section className="relative flex h-full flex-col">
      <IntroBackground variant="closeup" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-10 pt-16">
        <div className="mx-auto w-full max-w-[300px] space-y-3">
          <SpeechBubble>
            네 팔자에 남들이 모르는 비밀 하나 있더라.
          </SpeechBubble>
          <SpeechBubble delayMs={160}>궁금하지? 그럼, 이리 와.</SpeechBubble>
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
