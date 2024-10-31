import Image from "next/image";
import { StaticImageData } from "next/image";

interface ImageSectionProps {
  src: StaticImageData;
  alt: string;
  width: number;
  height: number;
}

// component for an image (full screen and responsive)
const ImageContainer = ({ src, alt, width, height }: ImageSectionProps) => (
  <div className="image-container mt-6 flex h-4/5 w-full items-center justify-center rounded-lg min-[640px]:h-[40rem]">
    <Image
      className="h-full w-full rounded-lg object-cover"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  </div>
);

export default ImageContainer;
