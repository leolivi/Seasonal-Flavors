"use client";
import { Button } from "../button/button";
import { CardLayoutOptions } from "@/utils/card-layout-options";
import { CardList } from "../card-list.tsx/card-list";
import { motion, useScroll, useTransform } from "framer-motion";
import { Recipe } from "@/services/recipe/recipeService";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

interface CardSliderProps {
  cardData: Recipe[];
  deleteRecipe?: (id: number) => void;
}

/*
  @desc Displays the card slider
*/
export const CardSlider = ({ cardData }: CardSliderProps) => {
  // get the router
  const router = useRouter();

  // get the carousel ref
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // get the scroll progress
  const { scrollXProgress } = useScroll({ container: carouselRef });
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  // handle the click
  const handleClick = () => {
    router.push("/recipes");
  };

  // render the card slider
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
        {/* card list */}
        <CardList
          cardData={cardData}
          viewOptions={{
            style: CardLayoutOptions.FLEX,
            showEdit: false,
          }}
          handlers={{
            deleteRecipe: () => {},
            onBookmarkClick: () => {},
            onEditClick: () => {},
          }}
        />
      </motion.div>

      {/* button */}
      <div className="mt-0 flex justify-center min-[640px]:mt-4">
        <Button label="zu den Rezepten" onClick={handleClick} />
      </div>
    </div>
  );
};
