"use client";
import React, { useRef } from "react";
import { color, motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import { CardList } from "../card-list.tsx/card-list";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { LayoutOptions } from "@/utils/layout-options";

interface CardSliderProps {
  cardData: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    season?: string;
  }[];
}

export const CardSlider = ({ cardData }: CardSliderProps) => {
  const seasonalColor = getSeasonColor();

  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const { scrollXProgress } = useScroll({ container: carouselRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  const handleClick = () => {
    router.push("/recipes");
  };

  return (
    <div className="wrapper select-none">
      <motion.div
        className="bg-progress left-0 top-0 h-1"
        style={{ width: progressWidth }}
      />

      <motion.div
        ref={carouselRef}
        className={`carousel whitespace-nowrap scrollbar`}
        drag="x"
        dragConstraints={{
          left: -(carouselRef.current?.scrollWidth || 0),
          right: 0,
        }}
        dragElastic={0.1}
        whileTap={{ cursor: "grabbing" }}
        style={{ touchAction: "pan-y" }}
      >
        <CardList cardData={cardData} style={LayoutOptions.FLEX} />
      </motion.div>

      <div className="mt-4 flex justify-center">
        <Button label="zu den Rezepten" onClick={handleClick} />
      </div>
    </div>
  );
};
