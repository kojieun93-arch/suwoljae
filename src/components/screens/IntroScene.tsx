import { CinematicLine } from "@/components/CinematicLine";
import { DialogueBar } from "@/components/DialogueBar";
import { SceneImage } from "@/components/SceneImage";

type IntroSceneProps = {
  imageSrc: string;
  imageAlt: string;
  line: string;
  buttonLabel: string;
  onNext: () => void;
  imagePosition?: string;
};

/** Shared cinematic intro layout: full-bleed art + subtitle + bottom pill. */
export function IntroScene({
  imageSrc,
  imageAlt,
  line,
  buttonLabel,
  onNext,
  imagePosition = "object-[center_10%]",
}: IntroSceneProps) {
  return (
    <section className="relative h-full min-h-0 w-full overflow-hidden animate-fade-in">
      <SceneImage
        src={imageSrc}
        alt={imageAlt}
        priority
        className={`object-cover ${imagePosition}`}
      />

      {/* Soft vignette for subtitle readability without covering the face */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[12%] bg-gradient-to-b from-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[48%] bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

      {/* Subtitle — slightly below vertical center */}
      <div className="safe-pad-x pointer-events-none absolute inset-x-0 top-[54%] z-10 -translate-y-1/2">
        <CinematicLine>{line}</CinematicLine>
      </div>

      {/* Bottom pill — safe-area aware */}
      <div
        className="safe-pad-x absolute inset-x-0 bottom-0 z-10 flex justify-center"
        style={{
          paddingBottom:
            "max(2.75rem, calc(2rem + env(safe-area-inset-bottom, 0px)))",
        }}
      >
        <DialogueBar onClick={onNext}>{buttonLabel}</DialogueBar>
      </div>
    </section>
  );
}
