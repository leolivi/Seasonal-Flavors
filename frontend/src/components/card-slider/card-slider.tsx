import React, { useRef, useState } from "react";
import { Button } from "../button/button";
import { cardData } from "../../data/carddata";
import { useRouter } from "next/navigation";
import { CardList, LayoutOptions } from "../card-list.tsx/card-list";

// card slider component including dragmove function
export const CardSlider = () => {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // handler for starting the drag motion
  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!carouselRef.current) return;

    // get the X position of the mouse/touch event
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;

    setIsDragging(true);
    setStartX(pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  // handler for dragging movement
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - carouselRef.current.offsetLeft;
    const walk = (x - (startX as number)) * 1.5;
    carouselRef.current.scrollLeft = (scrollLeft as number) - walk;
  };

  // handler for ending the drag motion
  const handleDragEnd = () => {
    if (!carouselRef.current) return;

    setIsDragging(false);
    carouselRef.current.style.cursor = "grab";
    carouselRef.current.style.userSelect = "auto";
  };

  // set event listeners for mouse and touch events
  React.useEffect(() => {
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDragMove);
    document.addEventListener("touchend", handleDragEnd);

    return () => {
      // remove event listeners on component unmount
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDragMove);
      document.removeEventListener("touchend", handleDragEnd);
    };
  });

  // Handler for button click to navigate to recipes
  const handleClick = () => {
    router.push("/rezepte");
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
