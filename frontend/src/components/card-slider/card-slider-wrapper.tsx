import { CardSlider } from "./card-slider";
import { Recipe } from "@/services/recipe/recipeService";
import React from "react";

interface CardSliderWrapperProps {
  cardData: Recipe[];
}

/*
  @desc Wrapper for the card slider
*/
export const CardSliderWrapper = ({ cardData }: CardSliderWrapperProps) => {
  return (
    <div className="wrapper select-none">
      <div className="carousel overflow-hidden overflow-y-hidden whitespace-nowrap">
        {/* card slider */}
        <CardSlider cardData={cardData} />
      </div>
    </div>
  );
};
