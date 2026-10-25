"use client";

import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SceneImage } from "@/components/SceneImage";

type LandingScreenProps = {
  onStart: () => void;
  onSkip: () => void;
};

type Phase = "enter" | "idle" | "leaving";

export function LandingScreen({ onStart, onSkip }: LandingScreenProps) {
  const [phase, setPhase] = useState<Phase>("enter");
  const [bgReady, setBgReady] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setBgReady(true);
      setShowLogo(true);
      setShowSlogan(true);
      setShowButton(true);
      setPhase("idle");
      return;
    }

    const t0 = window.setTimeout(() => setBgReady(true), 40);
    const t1 = window.setTimeout(() => setShowLogo(true), 700);
    const t2 = window.setTimeout(() => setShowSlogan(true), 1100);
    const t3 = window.setTimeout(() => {
      setShowButton(true);
      setPhase("idle");
    }, 1500);

    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const handleStart = () => {
    if (phase === "leaving") return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onStart();
      return;
    }
    setPhase("leaving");
    window.setTimeout(() => onStart(), 780);
  };

  return (
    <section className="relative h-full min-h-0 w-full overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${
          bgReady ? "opacity-100" : "opacity-0"
        } ${phase === "leaving" ? "animate-slow-zoom" : ""}`}
      >
        <SceneImage
          src="/images/landing-bg.png"
          alt="보랏빛 달과 수련꽃 연못, 전통 한옥이 있는 수월재 밤 풍경"
          priority
          className="object-cover object-center"
        />
        <div
          aria-hidden
          className="animate-soft-glow pointer-events-none absolute right-[8%] top-[10%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(180,140,220,0.28)_0%,transparent_70%)]"
        />
        <span
          aria-hidden
          className="animate-petal pointer-events-none absolute left-[18%] top-[22%] h-2 w-2 rounded-full bg-[#c47ab0]/50"
          style={{ animationDelay: "0.4s" }}
        />
        <span
          aria-hidden
          className="animate-petal pointer-events-none absolute right-[22%] top-[28%] h-1.5 w-1.5 rounded-full bg-[#d6a0c4]/45"
          style={{ animationDelay: "2.2s" }}
        />
        <span
          aria-hidden
          className="animate-petal pointer-events-none absolute left-[62%] top-[18%] h-2 w-2 rounded-full bg-[#b070a0]/40"
          style={{ animationDelay: "4.1s" }}
        />
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-30 bg-[#12081f] transition-opacity duration-700 ${
          phase === "leaving" ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className="safe-pad-x absolute inset-x-0 top-0 z-10 flex justify-end"
        style={{
          paddingTop:
            "max(1.25rem, calc(0.5rem + env(safe-area-inset-top, 0px)))",
        }}
      >
        <button
          type="button"
          onClick={onSkip}
          className="rounded-full border border-[#d4af37]/65 bg-[#1a0b2e]/45 px-3.5 py-1.5 text-xs text-[#f7f1e6]/95 backdrop-blur-sm transition active:scale-95"
        >
          건너뛰기
        </button>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <div
            className={`${
              showLogo ? "animate-fade-up opacity-100" : "opacity-0"
            }`}
          >
            <div
              aria-hidden
              className="mb-3 text-2xl text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.45)]"
            >
              ❈
            </div>
            <div className="rounded-[999px] border border-[#d4af37]/45 bg-[#12081f]/40 px-11 py-8 shadow-[0_0_40px_rgba(26,11,46,0.4)] backdrop-blur-[2px]">
              <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-wide text-[#f7f1e6] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]">
                수월재
              </h1>
              <p className="mt-2 font-[family-name:var(--font-display)] text-lg tracking-[0.35em] text-[#f7f1e6]/90">
                水月齋
              </p>
            </div>
          </div>

          <div
            className={`mt-5 ${
              showSlogan ? "animate-fade-up opacity-100" : "opacity-0"
            }`}
          >
            <p className="max-w-[260px] break-keep text-sm leading-relaxed text-[#f7f1e6]/88 drop-shadow-[0_1px_8px_rgba(0,0,0,0.65)]">
              달빛 아래
              <br />
              피어나는 운명의 이야기
            </p>
          </div>
        </div>
      </div>

      <div
        className={`safe-pad-x absolute inset-x-0 bottom-0 z-10 flex justify-center ${
          showButton ? "animate-fade-up opacity-100" : "opacity-0"
        }`}
        style={{
          paddingBottom:
            "max(2.75rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
        }}
      >
        <PrimaryButton onClick={handleStart} disabled={phase === "leaving"}>
          시작하기 →
        </PrimaryButton>
      </div>
    </section>
  );
}
