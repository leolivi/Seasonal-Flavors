import React, { useRef, useState } from "react";
import { CardList } from "./cardList";
import { Button } from "../button/button";
import { cardData } from "../../data/carddata";
import Link from "next/link";

export const CardSlider = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!carouselRef.current) return;

    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;

    setIsDragging(true);
    setStartX(pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - carouselRef.current.offsetLeft;
    const walk = (x - (startX as number)) * 1.5;
    carouselRef.current.scrollLeft = (scrollLeft as number) - walk;
  };

  const handleDragEnd = () => {
    if (!carouselRef.current) return;

    setIsDragging(false);
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.style.userSelect = "auto";
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  });

  const buttonText = "zu den Rezepten";

  return (
    <div className="wrapper select-none">
      <div
        ref={carouselRef}
        className="carousel cursor-grab overflow-hidden overflow-y-hidden whitespace-nowrap"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <CardList cardData={cardData} />
      </div>
      <div className="flex justify-center">
        <Link href={"/rezepte"}>
          <Button>{buttonText}</Button>
        </Link>
      </div>
    </div>
  );
};
