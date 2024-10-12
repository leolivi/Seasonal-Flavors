"use client";
import Image from "next/image";
import foodImage from "../../assets/images/food-image.jpg";
import SeasonAnimation from "./seasonAnimation";
import { Typography } from "../ui/typography";

const Heading = () => (
  <>
    <Typography variant="teaserL" className="font-figtreeMedium text-sfblack">
      Frisch auf den Tisch
    </Typography>
    <Typography
      variant="teaserS"
      className="z-1 w-full -translate-y-10 text-right font-cordaRegular text-sfblack min-[500px]:translate-y-0"
    >
      <span className="block min-[1024px]:inline">saisonale &</span> regionale
      Rezepte
    </Typography>
  </>
);

const ImageSection = () => (
  <div className="image-container mt-6 flex h-4/5 w-full items-center justify-center rounded-lg min-[640px]:h-[40rem]">
    <Image
      className="h-full w-full rounded-lg object-cover"
      src={foodImage}
      alt="Leckeres Essen"
      width={500}
      height={300}
    />
  </div>
);

export default function Teaser() {
  return (
    <div className="teaser-container p-8">
      <Heading />
      <ImageSection />
      <SeasonAnimation />
    </div>
  );
}
