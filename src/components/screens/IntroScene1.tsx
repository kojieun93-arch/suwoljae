import { IntroBackground } from "@/components/backgrounds/IntroBackground";
import { SpeechBubble } from "@/components/SpeechBubble";

type IntroScene1Props = {
  onNext: () => void;
};

export function IntroScene1({ onNext }: IntroScene1Props) {
  return (
    <section className="relative flex h-full flex-col">
      <IntroBackground variant="table" />

      <div className="relative z-10 flex flex-1 flex-col justify-between px-5 pb-6 pt-16">
        <div className="mx-auto w-full max-w-[300px] space-y-3">
          <SpeechBubble>왔어? 생각보다 늦었네.</SpeechBubble>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="animate-fade-in w-full rounded-2xl border border-white/15 bg-[#1a0b2e]/80 px-4 py-4 text-left text-[15px] leading-relaxed text-white/95 backdrop-blur-md transition active:scale-[0.99]"
          style={{ animationDelay: "180ms" }}
        >
          <div className="flex items-start justify-between gap-3">
            <p>
              뭐, 기다린 건 아니고, ...오늘은 어떤 고민을 들고 온 거야?
            </p>
            <span className="mt-0.5 shrink-0 text-white/60" aria-hidden>
              ›
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}
