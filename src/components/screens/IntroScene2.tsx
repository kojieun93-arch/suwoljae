import { IntroScene } from "@/components/screens/IntroScene";

type IntroScene2Props = {
  onNext: () => void;
};

export function IntroScene2({ onNext }: IntroScene2Props) {
  return (
    <IntroScene
      imageSrc="/images/suryeon-intro-1.png"
      imageAlt="수련이 턱을 괴고 앉아 있고 앞에 흑백 고양이가 있는 장면"
      line="생각보다 늦었네."
      buttonLabel="다음"
      onNext={onNext}
      imagePosition="object-[center_8%]"
    />
  );
}
