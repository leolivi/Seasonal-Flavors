"use client";
import { Season } from "@/utils/Season";
import { Typography } from "../ui/typography";
import { motion, useScroll, useTransform } from "framer-motion";

interface InspirationTextProps {
  seasonName: string;
}

// Component to display seasonal inspiration text with scroll-based animation
export const InspirationText = ({ seasonName }: InspirationTextProps) => {
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
