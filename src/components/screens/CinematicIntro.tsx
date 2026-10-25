"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CinematicLine } from "@/components/CinematicLine";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type Phase = "entering" | "waiting" | "dialogue" | "transitioning" | "final";

type ImageLayer = {
  src: string;
  alt: string;
  objectPosition: string;
};

const IMAGE_1: ImageLayer = {
  src: "/images/suryeon-intro-1.png",
  alt: "수련과 고양이",
  objectPosition: "object-[center_8%]",
};

const IMAGE_2: ImageLayer = {
  src: "/images/suryeon-intro-2.png",
  alt: "수련이 방울을 든 모습",
  objectPosition: "object-[center_16%]",
};

/** Dialogue lines tied to image 1 (before portrait change). */
const LINES_A = ["왔어?", "생각보다 늦었네.", "뭐, 기다린 건 아니고."] as const;
/** Dialogue lines tied to image 2 (after portrait change). */
const LINES_B = [
  "니 팔자에 남들이 모르는 비밀 하나 있더라.",
  "궁금하제? 그럼 이리 와.",
] as const;

const ENTER_MS = 800;
const LINE_FADE_MS = 300;
const LINE_CHANGE_MS = 400;
const IMAGE_CROSSFADE_MS = 700;
const TYPE_MS = 36;
/** Ignore taps that may leak from the landing CTA click. */
const INPUT_GRACE_MS = 450;

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
  const [phase, setPhase] = useState<Phase>("entering");
  const [, setLineIndex] = useState(0); // within current group A or B
  const [, setGroup] = useState<"A" | "B">("A");
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [lineOpacity, setLineOpacity] = useState(0);

  // Dual layers for opacity-only crossfade (stable layout)
  const [layerA, setLayerA] = useState(IMAGE_1);
  const [layerB] = useState(IMAGE_2);
  const [opacityA, setOpacityA] = useState(0);
  const [opacityB, setOpacityB] = useState(0);
  const [front, setFront] = useState<"A" | "B">("A");

  const phaseRef = useRef<Phase>("entering");
  const typingDoneRef = useRef(false);
  const lockRef = useRef(false);
  const acceptInputRef = useRef(false);
  const typingRef = useRef<number | null>(null);
  const lineIndexRef = useRef(0);
  const groupRef = useRef<"A" | "B">("A");

  const clearTyping = useCallback(() => {
    if (typingRef.current != null) {
      window.clearInterval(typingRef.current);
      typingRef.current = null;
    }
  }, []);

  const setPhaseSafe = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  // Mount: enter with image-only crossfade, then wait (no dialogue)
  useEffect(() => {
    const reduced = prefersReducedMotion();
    acceptInputRef.current = false;
    lockRef.current = true;

    // Start from invisible → fade in IMAGE_1
    setOpacityA(0);
    setOpacityB(0);
    setFront("A");
    setLayerA(IMAGE_1);

    const raf = requestAnimationFrame(() => {
      setOpacityA(1);
    });

    const enterMs = reduced ? 0 : ENTER_MS;
    const tEnter = window.setTimeout(() => {
      setPhaseSafe("waiting");
      lockRef.current = false;
    }, enterMs);

    const tGrace = window.setTimeout(() => {
      acceptInputRef.current = true;
    }, enterMs + (reduced ? 0 : INPUT_GRACE_MS));

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(tEnter);
      window.clearTimeout(tGrace);
      clearTyping();
    };
  }, [clearTyping, setPhaseSafe]);

  const startTyping = useCallback(
    (full: string, isLastLine: boolean) => {
      clearTyping();
      const finish = () => {
        setTypingDone(true);
        typingDoneRef.current = true;
        if (isLastLine) {
          setPhaseSafe("final");
        }
      };
      if (prefersReducedMotion()) {
        setTyped(full);
        finish();
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
          finish();
        }
      }, TYPE_MS);
    },
    [clearTyping, setPhaseSafe],
  );

  const showLine = useCallback(
    async (full: string, isLastLine = false) => {
      setPhaseSafe("dialogue");
      setLineOpacity(0);
      setTyped("");
      typingDoneRef.current = false;
      setTypingDone(false);

      if (!prefersReducedMotion()) {
        await new Promise((r) => window.setTimeout(r, 16));
        setLineOpacity(1);
        await new Promise((r) => window.setTimeout(r, LINE_FADE_MS));
      } else {
        setLineOpacity(1);
      }
      startTyping(full, isLastLine);
    },
    [setPhaseSafe, startTyping],
  );

  const hideLine = useCallback(async () => {
    if (prefersReducedMotion()) {
      setLineOpacity(0);
      setTyped("");
      return;
    }
    setLineOpacity(0);
    await new Promise((r) => window.setTimeout(r, LINE_CHANGE_MS));
    setTyped("");
  }, []);

  const crossfadeToImage2 = useCallback(async () => {
    setPhaseSafe("transitioning");
    lockRef.current = true;
    await hideLine();

    if (prefersReducedMotion()) {
      setOpacityA(0);
      setOpacityB(1);
      setFront("B");
    } else {
      // Opacity-only: both layers stacked, swap visibility
      setOpacityB(1);
      setOpacityA(0);
      setFront("B");
      await new Promise((r) => window.setTimeout(r, IMAGE_CROSSFADE_MS));
    }

    setGroup("B");
    groupRef.current = "B";
    setLineIndex(0);
    lineIndexRef.current = 0;
    setPhaseSafe("waiting");
    lockRef.current = false;
  }, [hideLine, setPhaseSafe]);

  const advance = useCallback(async () => {
    if (!acceptInputRef.current || lockRef.current) return;

    const p = phaseRef.current;

    if (p === "entering" || p === "transitioning") return;

    // waiting → first (or next group) dialogue
    if (p === "waiting") {
      lockRef.current = true;
      const lines = groupRef.current === "A" ? LINES_A : LINES_B;
      const idx = lineIndexRef.current;
      const isLastLine =
        groupRef.current === "B" && idx === LINES_B.length - 1;
      await showLine(lines[idx], isLastLine);
      lockRef.current = false;
      return;
    }

    // dialogue: typing → complete only (do not auto-advance)
    if (p === "dialogue" && !typingDoneRef.current) {
      clearTyping();
      const lines = groupRef.current === "A" ? LINES_A : LINES_B;
      const idx = lineIndexRef.current;
      const full = lines[idx];
      setTyped(full);
      setTypingDone(true);
      typingDoneRef.current = true;
      if (groupRef.current === "B" && idx === LINES_B.length - 1) {
        setPhaseSafe("final");
      }
      return;
    }

    // dialogue done → next step
    if (p === "dialogue" && typingDoneRef.current) {
      lockRef.current = true;
      const g = groupRef.current;
      const idx = lineIndexRef.current;

      if (g === "A") {
        if (idx < LINES_A.length - 1) {
          await hideLine();
          const next = idx + 1;
          lineIndexRef.current = next;
          setLineIndex(next);
          await showLine(LINES_A[next], false);
          lockRef.current = false;
          return;
        }
        // After third line → image transition, then wait without dialogue
        await crossfadeToImage2();
        return;
      }

      // group B
      if (idx < LINES_B.length - 1) {
        await hideLine();
        const next = idx + 1;
        lineIndexRef.current = next;
        setLineIndex(next);
        await showLine(LINES_B[next], next === LINES_B.length - 1);
        lockRef.current = false;
        return;
      }

      // Already on last completed line
      setPhaseSafe("final");
      lockRef.current = false;
      return;
    }

    // final: only CTA advances (ignore background taps)
    if (p === "final") return;
  }, [
    clearTyping,
    crossfadeToImage2,
    hideLine,
    setPhaseSafe,
    showLine,
  ]);

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
    e.preventDefault();
    onComplete();
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSkip();
  };

  const showHint = phase === "waiting";
  const showSubtitle =
    (phase === "dialogue" || phase === "final") && lineOpacity > 0;
  const showCta = phase === "final";

  return (
    <section
      className="relative h-full min-h-0 w-full cursor-pointer overflow-hidden select-none"
      onClick={onTap}
      role="presentation"
    >
      {/* Stable dual layers — opacity only, no layout jump */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            opacity: opacityA,
            transition: prefersReducedMotion()
              ? "none"
              : `opacity ${front === "A" && phase === "entering" ? ENTER_MS : IMAGE_CROSSFADE_MS}ms ease-out`,
            zIndex: front === "A" ? 2 : 1,
          }}
        >
          <SceneImage
            src={layerA.src}
            alt={layerA.alt}
            priority
            className={`object-cover ${layerA.objectPosition}`}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            opacity: opacityB,
            transition: prefersReducedMotion()
              ? "none"
              : `opacity ${IMAGE_CROSSFADE_MS}ms ease-out`,
            zIndex: front === "B" ? 2 : 1,
          }}
        >
          <SceneImage
            src={layerB.src}
            alt={layerB.alt}
            priority
            className={`object-cover ${layerB.objectPosition}`}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-[42%] z-[3] h-[28%] bg-gradient-to-b from-transparent via-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[20%] bg-gradient-to-t from-black/45 to-transparent" />

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

      {/* Subtitle slot — always present, transparent when empty */}
      <div
        className="safe-pad-x pointer-events-none absolute inset-x-0 top-[56%] z-10 -translate-y-1/2"
        style={{
          opacity: showSubtitle ? lineOpacity : 0,
          transition: prefersReducedMotion()
            ? "none"
            : `opacity ${LINE_FADE_MS}ms ease-out`,
        }}
        aria-live="polite"
      >
        <CinematicLine>
          {typed}
          {phase === "dialogue" && !typingDone && (
            <span className="opacity-35">▍</span>
          )}
        </CinematicLine>
      </div>

      {showHint && (
        <p className="pointer-events-none absolute bottom-[16%] left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-wide text-white/40">
          화면을 터치해 계속하기
        </p>
      )}

      {showCta && (
        <div
          data-cta
          className="safe-pad-x absolute inset-x-0 bottom-0 z-20 flex justify-center"
          style={{
            paddingBottom:
              "max(2.75rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
            animation: prefersReducedMotion()
              ? undefined
              : "fade-in 300ms ease-out both",
          }}
        >
          <PrimaryButton onClick={handleCta}>내 운명 보러 가기</PrimaryButton>
        </div>
      )}
    </section>
  );
}
