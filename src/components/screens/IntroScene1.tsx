import { DialogueBar } from "@/components/DialogueBar";
import { SceneImage } from "@/components/SceneImage";
import { SpeechBubble } from "@/components/SpeechBubble";

type IntroScene1Props = {
  onNext: () => void;
};

export function IntroScene1({ onNext }: IntroScene1Props) {
  return (
    <section className="relative flex h-full w-full flex-col animate-fade-in">
      <SceneImage
        src="/images/suryeon-intro-1.png"
        alt="수련이 턱을 괴고 앉아 있고 앞에 흑백 고양이가 있는 장면"
        priority
        className="object-[center_18%]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[16%] bg-gradient-to-b from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[34%] bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-7 pt-14">
        <div className="mx-auto w-full max-w-[300px]">
          <SpeechBubble>왔어? 생각보다 늦었네.</SpeechBubble>
        </div>

        <DialogueBar onClick={onNext}>뭐, 기다린 건 아니고.</DialogueBar>
      </div>
    </section>
  );
}
