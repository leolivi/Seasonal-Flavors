import React from "react";
import { CardSlider } from "./card-slider";
import { Recipe } from "@/services/recipe/recipeService";

interface CardSliderWrapperProps {
  cardData: Recipe[];
}

// Client component to handle routing and dragging logic
export const CardSliderWrapper = ({ cardData }: CardSliderWrapperProps) => {
  return (
    <div className="wrapper select-none">
      <div className="carousel overflow-hidden overflow-y-hidden whitespace-nowrap">
        <CardSlider cardData={cardData} />
      </div>
    </div>
  );
};
