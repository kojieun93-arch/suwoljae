"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CinematicLine } from "@/components/CinematicLine";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type Beat = {
  image: string;
  alt: string;
  line: string;
  objectPosition: string;
};

const BEATS: Beat[] = [
  {
    image: "/images/suryeon-intro-1.png",
    alt: "수련과 고양이",
    line: "왔어?",
    objectPosition: "object-[center_8%]",
  },
  {
    image: "/images/suryeon-intro-1.png",
    alt: "수련과 고양이",
    line: "생각보다 늦었네.",
    objectPosition: "object-[center_8%]",
  },
  {
    image: "/images/suryeon-intro-1.png",
    alt: "수련과 고양이",
    line: "뭐, 기다린 건 아니고.",
    objectPosition: "object-[center_8%]",
  },
  {
    image: "/images/suryeon-intro-2.png",
    alt: "수련이 방울을 든 모습",
    line: "니 팔자에 남들이 모르는 비밀 하나 있더라.",
    objectPosition: "object-[center_16%]",
  },
  {
    image: "/images/suryeon-intro-2.png",
    alt: "수련이 방울을 든 모습",
    line: "궁금하제? 그럼 이리 와.",
    objectPosition: "object-[center_16%]",
  },
];

const TYPE_MS = 42;
const CROSSFADE_MS = 600;

type CinematicIntroProps = {
  onComplete: () => void;
  onSkip: () => void;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CinematicIntro({ onComplete, onSkip }: CinematicIntroProps) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [lineVisible, setLineVisible] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [layerA, setLayerA] = useState(BEATS[0]);
  const [layerB, setLayerB] = useState(BEATS[0]);
  const [opacityA, setOpacityA] = useState(1);
  const [opacityB, setOpacityB] = useState(0);

  const typingRef = useRef<number | null>(null);
  const lockRef = useRef(false);
  const indexRef = useRef(0);
  const typingDoneRef = useRef(false);
  const activeImageRef = useRef(0);

  const isLast = index === BEATS.length - 1;

  const clearTyping = useCallback(() => {
    if (typingRef.current != null) {
      window.clearInterval(typingRef.current);
      typingRef.current = null;
    }
  }, []);

  const startTyping = useCallback(
    (full: string) => {
      clearTyping();
      if (prefersReducedMotion()) {
        setTyped(full);
        setTypingDone(true);
        typingDoneRef.current = true;
        return;
      }
      setTyped("");
      setTypingDone(false);
      typingDoneRef.current = false;
      let i = 0;
      typingRef.current = window.setInterval(() => {
        i += 1;
        setTyped(full.slice(0, i));
        if (i >= full.length) {
          clearTyping();
          setTypingDone(true);
          typingDoneRef.current = true;
        }
      }, TYPE_MS);
    },
    [clearTyping],
  );

  useEffect(() => {
    indexRef.current = index;
    setLineVisible(true);
    startTyping(BEATS[index].line);
    return clearTyping;
  }, [index, startTyping, clearTyping]);

  useEffect(() => {
    activeImageRef.current = activeImage;
  }, [activeImage]);

  const crossfadeTo = useCallback((nextBeat: Beat) => {
    if (prefersReducedMotion()) {
      if (activeImageRef.current === 0) {
        setLayerA(nextBeat);
        setOpacityA(1);
        setOpacityB(0);
      } else {
        setLayerB(nextBeat);
        setOpacityB(1);
        setOpacityA(0);
      }
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      if (activeImageRef.current === 0) {
        setLayerB(nextBeat);
        requestAnimationFrame(() => {
          setOpacityB(1);
          setOpacityA(0);
          setActiveImage(1);
          window.setTimeout(resolve, CROSSFADE_MS);
        });
      } else {
        setLayerA(nextBeat);
        requestAnimationFrame(() => {
          setOpacityA(1);
          setOpacityB(0);
          setActiveImage(0);
          window.setTimeout(resolve, CROSSFADE_MS);
        });
      }
    });
  }, []);

  const advance = useCallback(async () => {
    if (lockRef.current) return;
    const current = indexRef.current;
    const currentBeat = BEATS[current];

    if (!typingDoneRef.current) {
      clearTyping();
      setTyped(currentBeat.line);
      setTypingDone(true);
      typingDoneRef.current = true;
      return;
    }

    if (current >= BEATS.length - 1) return;

    lockRef.current = true;

    const next = current + 1;
    const nextBeat = BEATS[next];
    const imageChanged = nextBeat.image !== currentBeat.image;

    if (!prefersReducedMotion()) {
      setLineVisible(false);
      await new Promise((r) => window.setTimeout(r, 180));
    }

    if (imageChanged) {
      await crossfadeTo(nextBeat);
    }

    setIndex(next);
    setLineVisible(true);

    window.setTimeout(() => {
      lockRef.current = false;
    }, 240);
  }, [clearTyping, crossfadeTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        void advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const onTap = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-cta]") || target.closest("[data-skip]")) return;
    void advance();
  };

  const handleCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComplete();
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSkip();
  };

  return (
    <section
      className="relative h-full min-h-0 w-full cursor-pointer overflow-hidden select-none"
      onClick={onTap}
      role="presentation"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 transition-opacity ease-out"
          style={{
            opacity: opacityA,
            transitionDuration: prefersReducedMotion()
              ? "0ms"
              : `${CROSSFADE_MS}ms`,
          }}
        >
          <SceneImage
            src={layerA.image}
            alt={layerA.alt}
            priority
            className={`object-cover ${layerA.objectPosition}`}
          />
        </div>
        <div
          className="absolute inset-0 transition-opacity ease-out"
          style={{
            opacity: opacityB,
            transitionDuration: prefersReducedMotion()
              ? "0ms"
              : `${CROSSFADE_MS}ms`,
          }}
        >
          <SceneImage
            src={layerB.image}
            alt={layerB.alt}
            priority
            className={`object-cover ${layerB.objectPosition}`}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[42%] z-[1] h-[28%] bg-gradient-to-b from-transparent via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[22%] bg-gradient-to-t from-black/50 to-transparent" />

      <div
        className="safe-pad-x absolute inset-x-0 top-0 z-20 flex justify-end"
        style={{
          paddingTop:
            "max(1.1rem, calc(0.5rem + env(safe-area-inset-top, 0px)))",
        }}
      >
        <button
          type="button"
          data-skip
          onClick={handleSkip}
          className="rounded-full border border-[#d4af37]/55 bg-[#1a0b2e]/45 px-3.5 py-1.5 text-xs text-[#f7f1e6]/90 backdrop-blur-sm transition active:scale-95"
        >
          건너뛰기
        </button>
      </div>

      <div
        className={`safe-pad-x pointer-events-none absolute inset-x-0 top-[56%] z-10 -translate-y-1/2 transition-opacity duration-200 ${
          lineVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <CinematicLine>
          {typed}
          {!typingDone && <span className="opacity-40">▍</span>}
        </CinematicLine>
      </div>

      {!isLast && (
        <p className="pointer-events-none absolute bottom-[18%] left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-wide text-white/35">
          화면을 터치하세요
        </p>
      )}

      {isLast && typingDone && (
        <div
          data-cta
          className="safe-pad-x absolute inset-x-0 bottom-0 z-20 flex justify-center animate-fade-up"
          style={{
            paddingBottom:
              "max(2.75rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
          }}
        >
          <PrimaryButton onClick={handleCta}>내 운명 보러 가기</PrimaryButton>
        </div>
      )}
    </section>
  );
}
