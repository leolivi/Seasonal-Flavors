"use client";
import Teaser from "@/components/teaser/teaser";
import { useEffect, useRef, useState } from "react";
import { Season } from "@/utils/Season";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CardSlider } from "@/components/card/cardSlider";
import { RegisterBanner } from "@/components/banner/registerBanner";
import { Typography } from "@/components/ui/typography";
import registerImage from "../assets/images/register-image.jpg";
import Image from "next/image";
import ScrollButton from "@/components/scroll-button/scroll-button";

interface InspirationTextProps {
  seasonName: string;
}

const Home = () => {
  const [seasonName, setSeasonName] = useState<string>("");

  useEffect(() => {
    const season = new Season();
    setSeasonName(season.getSeason());
  }, []);

  return (
    <div>
      <ScrollButton />
      <Teaser />
      <InspirationText seasonName={seasonName} />
      <CardSlider />
      <div className="h-1/8 relative my-24 flex items-center justify-center px-8 min-[640px]:h-80 min-[1024px]:h-96">
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
    </div>
  );
};

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

const InspirationText = ({ seasonName }: InspirationTextProps) => {
  const season = new Season();
  const seasonalColor = season.getColor();

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".seasontext",
        { x: -200 },
        {
          x: 0,
          scrollTrigger: {
            trigger: ".seasontext",
            start: "top 90%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <div ref={container} className="mb-5 mt-14 flex justify-center">
      <Typography variant="heading3">
        <p
          className={`seasontext font-figtreeMedium text-${seasonalColor}-dark`}
        >
          Inspirationen für den {translateSeason(seasonName)}
        </p>
      </Typography>
    </div>
  );
};

export default Home;
