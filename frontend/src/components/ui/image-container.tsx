import Image from "next/image";
import { StaticImageData } from "next/image";

interface ImageSectionProps {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

// component for an image (full screen and responsive)
const ImageContainer = ({ ...props }: ImageSectionProps) => (
  <div className="image-container mt-6 flex h-4/5 w-full items-center justify-center rounded-lg object-left-top min-[640px]:h-[40rem]">
    <Image
      className="h-full w-full rounded-lg object-cover"
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      priority={true}
    />
  </div>
);

export default ImageContainer;
