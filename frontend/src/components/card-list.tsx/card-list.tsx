import Card from "../card/card";
import Link from "next/link";
import { LayoutOptions, LayoutOptionType } from "@/utils/layout-options";
import React from "react";
import foodImage from "@/assets/images/food-image.jpg";
import { Recipe } from "@/services/recipe/recipeService";

interface CardListProps {
  cardData?: Recipe[];
  showDetail?: boolean;
  showBookmark?: boolean;
  showEdit?: boolean;
  style?: LayoutOptionType;
  onBookmarkClick?: (e: React.MouseEvent, recipeId: number) => void;
  onEditClick?: (e: React.MouseEvent, id: number) => void;
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
              image_id={item.image_id}
              title={item.title}
              prep_time={item.prep_time}
              season={item.season}
              showDetail={showDetail}
              showBookmark={showBookmark}
              showEdit={showEdit}
              onBookmarkClick={(e) => onBookmarkClick?.(e, item.id)}
              onEditClick={(e) => onEditClick?.(e, item.id)}
              cooking_time={0}
              servings={0}
              steps={""}
              ingredients={""}
              user_id={""}
            />
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
