"use client";
import Teaser from "@/components/teaser/teaser";
import { useEffect, useState } from "react";
import { Season } from "@/utils/Season";
import { motion, useScroll, useTransform } from "framer-motion";
import { CardSlider } from "@/components/card/cardSlider";
import { RegisterBanner } from "@/components/banner/registerBanner";
import { Typography } from "@/components/ui/typography";
import registerImage from "../assets/images/register-image.jpg";
import Image from "next/image";
import ScrollButton from "@/components/scroll-button/scroll-button";

interface InspirationTextProps {
  seasonName: string;
}

// Component to display seasonal inspiration text with scroll-based animation
const InspirationText = ({ seasonName }: InspirationTextProps) => {
  const season = new Season();
  const seasonalColor = season.getColor();

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.1, 0.6], [-200, 0]);

  // Function to translate the season name into German
  const translateSeason = (season: string): string => {
    switch (season.toLowerCase()) {
      case "spring":
        return "Frühling";
      case "summer":
        return "Sommer";
      case "autumn":
      case "fall":
        return "Herbst";
      case "winter":
        return "Winter";
      default:
        return season;
    }
  };

  return (
    <div className="mb-5 mt-14 flex justify-center">
      <Typography variant="heading3">
        <motion.p
          className={`seasontext font-figtreeMedium text-${seasonalColor}-dark`}
          style={{ x }}
        >
          Inspirationen für den {translateSeason(seasonName)}
        </motion.p>
      </Typography>
    </div>
  );
};

// Home component that renders the main content of the page
const Home = () => {
  const [seasonName, setSeasonName] = useState<string>("");

  // set the current season's name when the component mounts
  useEffect(() => {
    const season = new Season();
    setSeasonName(season.getSeason());
  }, []);

  return (
    <main>
      <ScrollButton />
      <Teaser />
      <InspirationText seasonName={seasonName} />
      <CardSlider />
      <div className="h-1/8 relative my-24 flex items-center justify-center px-4 min-[640px]:h-80 min-[640px]:px-8 min-[1024px]:h-96">
        <Image
          className="h-full w-full rounded-lg object-cover"
          src={registerImage}
          alt="Leckeres Essen"
          width={500}
          height={300}
        />
        <div className="absolute flex items-center justify-center">
          <RegisterBanner />
        </div>
      </div>
    </main>
  );
};

export default Home;
