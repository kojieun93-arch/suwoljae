"use client";

import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { ComingSoonScreen } from "@/components/screens/ComingSoonScreen";
import { CinematicIntro } from "@/components/screens/CinematicIntro";
import { LandingScreen } from "@/components/screens/LandingScreen";
import { TopicSelectScreen } from "@/components/screens/TopicSelectScreen";
import {
  getTopicById,
  loadSelectedTopic,
  type TopicId,
} from "@/lib/consultation";

type Scene = "landing" | "intro" | "topicSelect" | "comingSoon";

export function IntroFlow() {
  const [scene, setScene] = useState<Scene>("landing");
  const [selectedTopic, setSelectedTopic] = useState<TopicId | null>(null);

  useEffect(() => {
    setSelectedTopic(loadSelectedTopic());
  }, []);

  return (
    <MobileShell>
      {scene === "landing" && (
        <LandingScreen
          onStart={() => setScene("intro")}
          onSkip={() => setScene("topicSelect")}
        />
      )}
      {scene === "intro" && (
        <CinematicIntro
          onComplete={() => setScene("topicSelect")}
          onSkip={() => setScene("topicSelect")}
        />
      )}
      {scene === "topicSelect" && (
        <TopicSelectScreen
          initialTopicId={selectedTopic}
          onBack={() => setScene("intro")}
          onNext={(topicId) => {
            setSelectedTopic(topicId);
            setScene("comingSoon");
          }}
        />
      )}
      {scene === "comingSoon" && (
        <ComingSoonScreen
          selectedTopic={getTopicById(selectedTopic)}
          onBack={() => setScene("topicSelect")}
          onRestart={() => {
            setScene("landing");
          }}
        />
      )}
    </MobileShell>
  );
}
