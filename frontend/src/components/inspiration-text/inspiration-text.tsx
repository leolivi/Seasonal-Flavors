"use client";
import { Typography } from "../ui/typography";
import { motion, useScroll, useTransform } from "framer-motion";
import { getSeasonColor, translateSeason } from "@/utils/SeasonUtils";

interface InspirationTextProps {
  seasonName: string;
}

/*
  @desc Inspiration text
*/
export const InspirationText = ({ seasonName }: InspirationTextProps) => {
  // get the seasonal color
  const seasonalColor = getSeasonColor();
  // get the translated season
  const translatedSeason = translateSeason(seasonName);
  // get the scroll y progress
  const { scrollYProgress } = useScroll();
  // get the x transform
  const x = useTransform(scrollYProgress, [0.1, 0.6], [-200, 0]);

  // render the component
  return (
    <div className="relative mb-5 mt-14 flex justify-center" tabIndex={0}>
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
