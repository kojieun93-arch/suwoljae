"use client";

import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { ComingSoonScreen } from "@/components/screens/ComingSoonScreen";
import { CinematicIntro } from "@/components/screens/CinematicIntro";
import { LandingScreen } from "@/components/screens/LandingScreen";

type Scene = "landing" | "intro" | "comingSoon";

export function IntroFlow() {
  const [scene, setScene] = useState<Scene>("landing");

  return (
    <MobileShell>
      {scene === "landing" && (
        <LandingScreen
          onStart={() => setScene("intro")}
          onSkip={() => setScene("comingSoon")}
        />
      )}
      {scene === "intro" && (
        <CinematicIntro
          onComplete={() => setScene("comingSoon")}
          onSkip={() => setScene("comingSoon")}
        />
      )}
      {scene === "comingSoon" && (
        <ComingSoonScreen onRestart={() => setScene("landing")} />
      )}
    </MobileShell>
  );
}
