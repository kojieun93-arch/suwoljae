import { DialogueBar } from "@/components/DialogueBar";
import { SceneImage } from "@/components/SceneImage";
import { SpeechBubble } from "@/components/SpeechBubble";

type IntroScene1Props = {
  onNext: () => void;
};

export function IntroScene1({ onNext }: IntroScene1Props) {
  return (
    <section className="relative h-full min-h-0 w-full overflow-hidden animate-fade-in">
      <SceneImage
        src="/images/suryeon-intro-1.png"
        alt="수련이 턱을 괴고 앉아 있고 앞에 흑백 고양이가 있는 장면"
        priority
        className="object-cover object-[center_8%]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[18%] bg-gradient-to-b from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[46%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" />

      {/* Top dialogue — clear of notch / status bar */}
      <div
        className="safe-pad-x absolute inset-x-0 top-0 z-10"
        style={{
          paddingTop:
            "max(1.5rem, calc(0.85rem + env(safe-area-inset-top, 0px)))",
        }}
      >
        <div className="mx-auto w-full max-w-[320px]">
          <SpeechBubble>왔어? 생각보다 늦었네.</SpeechBubble>
        </div>
      </div>

      {/* Bottom dialogue — lifted by safe-area so it never clips */}
      <div
        className="safe-pad-x absolute inset-x-0 bottom-0 z-10"
        style={{
          paddingBottom:
            "max(3rem, calc(2.5rem + env(safe-area-inset-bottom, 0px)))",
        }}
      >
        <div className="mx-auto w-full max-w-[360px]">
          <DialogueBar onClick={onNext}>뭐, 기다린 건 아니고.</DialogueBar>
        </div>
      </div>
    </section>
  );
}
