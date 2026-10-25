"use client";

import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { ComingSoonScreen } from "@/components/screens/ComingSoonScreen";
import { IntroScene1 } from "@/components/screens/IntroScene1";
import { IntroScene2 } from "@/components/screens/IntroScene2";
import { IntroScene3 } from "@/components/screens/IntroScene3";
import { LandingScreen } from "@/components/screens/LandingScreen";

type Scene = "landing" | "intro1" | "intro2" | "intro3" | "comingSoon";

export function IntroFlow() {
  const [scene, setScene] = useState<Scene>("landing");

  return (
    <MobileShell>
      {scene === "landing" && (
        <LandingScreen
          onStart={() => setScene("intro1")}
          onSkip={() => setScene("comingSoon")}
        />
      )}
      {scene === "intro1" && (
        <IntroScene1 onNext={() => setScene("intro2")} />
      )}
      {scene === "intro2" && (
        <IntroScene2 onNext={() => setScene("intro3")} />
      )}
      {scene === "intro3" && (
        <IntroScene3 onContinue={() => setScene("comingSoon")} />
      )}
      {scene === "comingSoon" && (
        <ComingSoonScreen onRestart={() => setScene("landing")} />
      )}
    </MobileShell>
  );
}
