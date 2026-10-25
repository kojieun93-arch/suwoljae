"use client";

import { useLayoutEffect, useState } from "react";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";
import {
  TOPIC_OPTIONS,
  type TopicId,
  loadSelectedTopic,
  saveSelectedTopic,
} from "@/lib/consultation";

type TopicSelectScreenProps = {
  onBack: () => void;
  onNext: (topicId: TopicId) => void;
  /** When returning from a later screen, keep the prior choice in memory. */
  initialTopicId?: TopicId | null;
};

export function TopicSelectScreen({
  onBack,
  onNext,
  initialTopicId = null,
}: TopicSelectScreenProps) {
  const [selected, setSelected] = useState<TopicId | null>(() => {
    return initialTopicId ?? loadSelectedTopic();
  });

  // Keep in sync when returning via back (prop) or after refresh (storage)
  useLayoutEffect(() => {
    if (initialTopicId) {
      setSelected(initialTopicId);
      saveSelectedTopic(initialTopicId);
      return;
    }
    const stored = loadSelectedTopic();
    if (stored) setSelected(stored);
  }, [initialTopicId]);

  const handleSelect = (id: TopicId) => {
    setSelected(id);
    saveSelectedTopic(id);
  };

  const handleNext = () => {
    if (!selected) return;
    saveSelectedTopic(selected);
    onNext(selected);
  };

  return (
    <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden animate-fade-in">
      <SceneImage
        src="/images/suryeon-intro-2.png"
        alt="수련"
        priority
        className="object-cover object-[center_18%]"
      />
      <div className="absolute inset-0 bg-[#0d0618]/72" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0d0618] via-[#0d0618]/85 to-transparent" />

      <div
        className="safe-pad-x relative z-10 flex items-center justify-between"
        style={{
          paddingTop:
            "max(0.85rem, calc(0.4rem + env(safe-area-inset-top, 0px)))",
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-xl leading-none text-[#f7f1e6] backdrop-blur-sm transition active:scale-95"
          aria-label="뒤로가기"
        >
          ‹
        </button>
        <p className="font-[family-name:var(--font-display)] text-base tracking-wide text-[#f7f1e6]">
          수월재
        </p>
        <span className="w-10" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pt-3">
        <div className="mb-4 space-y-2 text-center">
          <p className="break-keep text-[15px] leading-relaxed text-[#f7f1e6]/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            좋아. 그럼 이제 니 이야기를 들려줘.
          </p>
          <p className="break-keep text-[17px] font-medium leading-relaxed text-[#f7f1e6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
            오늘은 뭐가 제일 궁금해서 왔어?
          </p>
        </div>

        <div
          className="min-h-0 flex-1 space-y-2.5 overflow-y-auto pb-2"
          role="radiogroup"
          aria-label="상담 주제"
        >
          {TOPIC_OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelect(option.id)}
                className={`w-full rounded-2xl px-4 py-3.5 text-left transition active:scale-[0.99] ${
                  isSelected
                    ? "border border-[#d4af37] bg-[#2a1538]/85 shadow-[0_0_20px_rgba(212,175,55,0.18)]"
                    : "border border-white/15 bg-[#1a0b2e]/70"
                }`}
              >
                <p
                  className={`text-[15px] font-medium ${
                    isSelected ? "text-[#d4af37]" : "text-[#f7f1e6]"
                  }`}
                >
                  {option.title}
                </p>
                <p className="mt-0.5 text-[13px] text-[#f7f1e6]/65">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="safe-pad-x relative z-10 flex justify-center pt-2"
        style={{
          paddingBottom:
            "max(1.75rem, calc(1.25rem + env(safe-area-inset-bottom, 0px)))",
        }}
      >
        <PrimaryButton onClick={handleNext} disabled={!selected}>
          다음
        </PrimaryButton>
      </div>
    </section>
  );
}
