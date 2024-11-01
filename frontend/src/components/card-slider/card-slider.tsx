import React from "react";
import { Button } from "../button/button";
import { useRouter } from "next/navigation";
import { CardList, LayoutOptions } from "../card-list.tsx/card-list";
import useDrag from "@/hooks/useDrag";

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
  const router = useRouter();
  const { carouselRef, handleDragStart } = useDrag();

  const handleClick = () => {
    router.push("/recipes");
  };

  return (
    <div className="wrapper select-none">
      <div
        ref={carouselRef}
        className="carousel cursor-grab overflow-hidden overflow-y-hidden whitespace-nowrap"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <CardList cardData={cardData} style={LayoutOptions.FLEX} />
      </div>

      <div className="flex justify-center">
        <Button label="zu den Rezepten" onClick={handleClick} />
      </div>
    </div>
  );
};
