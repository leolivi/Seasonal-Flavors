"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // Handler for button click to navigate to recipes
  const handleClick = () => {
    router.push("/rezepte");
  };

  return (
    <div className="wrapper select-none">
      <div className="carousel cursor-grab overflow-hidden overflow-y-hidden whitespace-nowrap">
        <CardSlider cardData={cardData} />
      </div>
    </div>
  );
};
