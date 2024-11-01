import React from "react";
import { CardSlider } from "./card-slider";

interface CardSliderWrapperProps {
  cardData: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    prepDuration?: number;
    season?: string;
  }[];
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
