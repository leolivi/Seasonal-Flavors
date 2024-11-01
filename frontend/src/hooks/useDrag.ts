"use client";
import { useRef, useState, useEffect } from "react";

const useDrag = () => {
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

  useEffect(() => {
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
  }, [isDragging]); // Add `isDragging` to the dependency array

  return { carouselRef, handleDragStart };
};

export default useDrag;
