import { IntroScene } from "@/components/screens/IntroScene";

type IntroScene3Props = {
  onContinue: () => void;
};

export function IntroScene3({ onContinue }: IntroScene3Props) {
  return (
    <IntroScene
      imageSrc="/images/suryeon-intro-2.png"
      imageAlt="수련이 방울을 들고 미소 짓는 장면"
      line="니 팔자에 남들이 모르는 비밀 하나 있더라."
      buttonLabel="내 운명 보러 가기"
      onNext={onContinue}
      imagePosition="object-[center_18%]"
    />
  );
}
