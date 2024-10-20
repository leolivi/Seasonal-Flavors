"use client";
import foodImage from "../../assets/images/food-image.jpg";
import SeasonAnimation from "./seasonAnimation";
import { Typography } from "../ui/typography";
import ImageSection from "../ui/ImageSection";

// heading component only used once in the whole project
const Heading = () => (
  <>
    <Typography variant="teaserL" className="font-figtreeMedium text-sfblack">
      Frisch auf den Tisch
    </Typography>
    <Typography
      variant="teaserS"
      className="z-1 w-full -translate-y-10 text-right font-cordaRegular text-sfblack max-[335px]:translate-y-2 min-[500px]:translate-y-0"
    >
      <h1>
        <span className="block min-[1024px]:inline">saisonale &</span> regionale
        Rezepte
      </h1>
    </Typography>
  </>
);

// homepage teaser component containing heading and Teaser Image
export default function Teaser() {
  return (
    <div className="teaser-container px-4 py-8 min-[640px]:p-8">
      <Heading />
      <ImageSection
        src={foodImage}
        alt="Leckeres Essen"
        width={500}
        height={300}
      />
      <SeasonAnimation />
    </div>
  );
}
