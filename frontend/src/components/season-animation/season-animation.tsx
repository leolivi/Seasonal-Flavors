"use client";
import { useRef } from "react";
import SeasonalFlavorsBrandmark from "../../assets/logo/seasonal-flavors-brandmark.svg";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCurrentSeason } from "@/utils/SeasonUtils";

/*
  @desc Component for the brandmark and its rotation movement
*/
export default function SeasonAnimation() {
  const container = useRef<HTMLDivElement>(null);

  // const testSeason = "winter";

  // get the current season
  const currentSeason = getCurrentSeason();

  // get the season index
  const seasons = ["winter", "autumn", "summer", "spring"];
  const seasonIndex = seasons.indexOf(currentSeason);

  // get the rotation increment
  const rotationIncrement = 90;
  const bottomPosition = 270;

  // calculate the base rotation based on the current season
  const startRotation =
    (seasonIndex * rotationIncrement + bottomPosition) % 360;
  const endRotation = (startRotation + rotationIncrement) % 360;

  //mapping position relative to the container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // rotation based on scroll position
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [startRotation, endRotation],
  );
  // Horizontal movement based on scroll
  const x = useTransform(scrollYProgress, [0, 0.5], [-200, 0]);

  return (
    <div
      ref={container}
      className="relative mt-20 flex items-center justify-center"
    >
      <motion.div
        style={{ rotate, x }}
        className="h-auto w-4/6 min-[640px]:w-3/6 min-[1024px]:w-2/6 min-[1280px]:w-1/5"
      >
        {/* brandmark */}
        <SeasonalFlavorsBrandmark className="brandmark" />
      </motion.div>
    </div>
  );
}
