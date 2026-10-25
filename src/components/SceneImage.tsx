import Image from "next/image";

type SceneImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/** Full-bleed mobile scene art. */
export function SceneImage({
  src,
  alt,
  priority = false,
  className = "",
  style,
}: SceneImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 430px) 100vw, 430px"
      className={`object-cover object-center ${className}`}
      style={style}
    />
  );
}
