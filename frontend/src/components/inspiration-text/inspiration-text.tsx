"use client";
import { Typography } from "../ui/typography";
import { motion, useScroll, useTransform } from "framer-motion";
import { getSeasonColor, translateSeason } from "@/utils/SeasonUtils";

interface InspirationTextProps {
  seasonName: string;
}

// Component to display seasonal inspiration text with scroll-based animation
export const InspirationText = ({ seasonName }: InspirationTextProps) => {
  const seasonalColor = getSeasonColor();
  const translatedSeason = translateSeason(seasonName);

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.1, 0.6], [-200, 0]);

  return (
    <div className="mb-5 mt-14 flex justify-center">
      <Typography variant="heading3">
        <motion.p
          className={`seasontext font-figtreeMedium text-${seasonalColor}-dark`}
          style={{ x }}
        >
          Inspirationen für den {translatedSeason}
        </motion.p>
      </Typography>
    </div>
  );
};
