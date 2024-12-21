import Card from "../card/card";
import Link from "next/link";
import { LayoutOptions, LayoutOptionType } from "@/utils/layout-options";
import React from "react";
import foodImage from "@/assets/images/food-image.jpg";

interface CardListProps {
  cardData?: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    imageId?: number;
    title: string;
    prepDuration?: number;
    season?: string;
  }[];
  showDetail?: boolean;
  showBookmark?: boolean;
  showEdit?: boolean;
  style?: LayoutOptionType;
  onBookmarkClick?: (e: React.MouseEvent) => void;
  onEditClick: (e: React.MouseEvent, id: number) => void;
}

// Component mapping through recipe Cards
export const CardList = ({
  showDetail,
  showBookmark,
  showEdit,
  style = LayoutOptions.GRID,
  cardData = [],
  onBookmarkClick,
  onEditClick,
}: CardListProps) => {
  return (
    <div className={style}>
      {cardData.map((item) => (
        <React.Fragment key={item.id}>
          <Link href={`/recipes/${item.id}`} className="cursor-pointer">
            <Card
              id={item.id}
              imageSrc={item.imageSrc || foodImage.src}
              imageAlt={item.imageAlt}
              imageId={item.imageId}
              title={item.title}
              prepDuration={item.prepDuration}
              season={item.season}
              showDetail={showDetail}
              showBookmark={showBookmark}
              showEdit={showEdit}
              onBookmarkClick={onBookmarkClick}
              onEditClick={(e) => onEditClick(e, item.id)}
            />
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
