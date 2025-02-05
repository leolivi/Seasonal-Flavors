"use client";

import Image from "next/image";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { ImageData, getRecipeImage } from "@/services/image/imageService";

interface ImageSectionProps {
  recipeId?: number;
  fallbackSrc?: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

// component for an image (full screen and responsive)
const ImageContainer = ({
  recipeId,
  fallbackSrc,
  alt,
  width,
  height,
  priority = true,
}: ImageSectionProps) => {
  const [imageData, setImageData] = useState<ImageData | undefined>();

  useEffect(() => {
    const fetchImage = async () => {
      if (recipeId) {
        const fetchedImageData = await getRecipeImage(recipeId);
        setImageData(fetchedImageData);
      }
    };

    fetchImage();
  }, [recipeId]);

  // Bestimme die finale Bildquelle
  const imageSrc = imageData?.file_path || fallbackSrc;

  if (!imageSrc) return null;

  // Prüfen ob die src eine vollständige URL ist
  const imageUrl =
    typeof imageSrc === "string" &&
    !imageSrc.startsWith("http") &&
    !imageSrc.startsWith("/")
      ? `/${imageSrc}`
      : imageSrc;

  return (
    <div className="image-container mt-6 flex h-full w-full items-center justify-center rounded-lg object-left-top min-[640px]:h-[40rem]">
      <Image
        className="h-full w-full rounded-lg object-cover"
        src={imageUrl}
        alt={imageData?.alt_text || alt}
        width={width}
        height={height}
        priority={priority}
      />
    </div>
  );
};

export default ImageContainer;
