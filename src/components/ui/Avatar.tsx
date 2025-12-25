import { Span } from "next/dist/trace";
import Image from "next/image";

type AvatarSize = "xl" | "lg" | "md" | "sm";

interface AvatarProps {
  size?: AvatarSize;
  placeholder?: string;
  src?: string;
  alt?: string;
}

const sizeMap: Record<AvatarSize, string> = {
  sm: "w-8",
  md: "w-12",
  lg: "w-16",
  xl: "w-24",
};

const textSizeMap: Record<AvatarSize, string> = {
  sm: "text-xs",
  md: "text-base",
  lg: "text-xl",
  xl: "text-3xl",
};

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  alt = "profile image",
  placeholder,
  src,
}) => {
  return (
    <div className={`avatar ${placeholder ? "avatar-placeholder" : ""}`}>
      <div
        className={`rounded-full ${
          placeholder ? "bg-neutral text-neutral-content" : ""
        } ${sizeMap[size]}`}>
        {src ? (
          <Image width={100} height={100} src={src} alt={alt} />
        ) : (
          <span className={textSizeMap[size]}>{placeholder}</span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
