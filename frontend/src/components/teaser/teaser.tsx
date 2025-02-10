"use client";
import foodImage from "@/assets/images/food-image.jpg";
import SeasonAnimation from "../season-animation/season-animation";
import { Typography } from "../ui/typography";
import ImageContainer from "../ui/image-container";

/*
  @desc Heading component
*/
const Heading = () => (
  <>
    <Typography variant="teaserL" className="font-figtreeMedium text-sfblack">
      Frisch auf den Tisch
    </Typography>
    <Typography
      variant="teaserS"
      className="z-1 w-full -translate-y-10 text-right font-cordaRegular text-sfblack max-[335px]:translate-y-2 min-[460px]:translate-y-1 min-[500px]:translate-y-0"
    >
      <h1 aria-label="saisonale & regionale Rezepte" tabIndex={0}>
        <span className="block min-[1024px]:inline">saisonale &</span> regionale
        Rezepte
      </h1>
    </Typography>
  </>
);

/*
  @desc Homepage teaser component containing heading and Teaser Image
*/
export default function Teaser() {
  return (
    <div className="teaser-container static px-4 py-8 min-[640px]:p-8">
      <Heading />
      <ImageContainer
        fallbackSrc={foodImage}
        alt="Leckeres Essen"
        width={1500}
        height={1000}
        priority
      />
      {/* season animation */}
      <SeasonAnimation aria-hidden="true" />
    </div>
  );
}
