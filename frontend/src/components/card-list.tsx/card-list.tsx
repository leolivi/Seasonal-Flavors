import { ReactNode, useState } from "react";
import Card from "../card/card";
import Link from "next/link";
import { LayoutOptions, LayoutOptionType } from "@/utils/layout-options";

interface CardListProps {
  cardData?: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    title: string;
    prepDuration?: number;
    season?: string;
  }[];
  showDetail?: boolean;
  style?: LayoutOptionType;
  onBookmarkClick: (e: React.MouseEvent) => void;
}

// Component mapping through recipe Cards
export const CardList = ({
  showDetail,
  style = LayoutOptions.GRID,
  cardData = [],
  onBookmarkClick,
}: CardListProps) => {
  return (
    <div className={style}>
      {cardData.map((item) => (
        <Link
          key={item.id}
          href={`/recipes/${item.id}`}
          className="cursor-pointer"
        >
          <Card
            key={item.id}
            imageSrc={item.imageSrc}
            imageAlt={item.imageAlt}
            title={item.title}
            prepDuration={item.prepDuration}
            season={item.season}
            showDetail={showDetail}
            onBookmarkClick={onBookmarkClick}
          />
        </Link>
      ))}
    </div>
  );
};
