import {
  CardLayoutOptions,
  CardLayoutOptionType,
} from "@/utils/card-layout-options";
import { Recipe } from "@/services/recipe/recipeService";
import Card from "../card/card";
import Link from "next/link";
import React from "react";

interface CardListProps {
  cardData: Recipe[];
  viewOptions: {
    showDetail?: boolean;
    showBookmark?: boolean;
    showEdit?: boolean;
    style?: CardLayoutOptionType;
  };
  handlers: {
    onBookmarkClick: (e: React.MouseEvent, id: number) => void;
    onEditClick: (e: React.MouseEvent, id: number) => void;
    deleteRecipe: (id: number) => void;
  };
}

/*
  @desc Displays the card list
*/
export const CardList = ({
  cardData,
  viewOptions,
  handlers,
  // user,
}: CardListProps) => {
  // get the card view options to pass to the pages
  const { style = CardLayoutOptions.GRID, ...cardViewOptions } = viewOptions;

  // render the card list
  return (
    <div className={style}>
      {cardData.map((recipe, index) => (
        <React.Fragment key={`${recipe.id}-${index}`}>
          <Link href={`/recipes/${recipe.id}`} className="cursor-pointer">
            <Card
              {...recipe}
              {...cardViewOptions}
              onBookmarkClick={(e) => handlers.onBookmarkClick(e, recipe.id)}
              onEditClick={(e) => handlers.onEditClick(e, recipe.id)}
              deleteRecipe={handlers.deleteRecipe}
              priority={index < 3}
              // user={user}
            />
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};
