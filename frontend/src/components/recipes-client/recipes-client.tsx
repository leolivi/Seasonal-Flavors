"use client";

import { useState } from "react";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import FilterBar from "@/components/filter-bar/filter-bar";
import { Typography } from "@/components/ui/typography";
import { Button, ButtonSize } from "@/components/button/button";
import Arrow from "src/assets/icons/arrow.svg";
import { LayoutOptions } from "@/utils/layout-options";
import { Recipe } from "@/services/recipe/recipeService";
import { usePaginationStore } from "@/stores/paginationStore";

interface RecipesClientProps {
  formattedCardData: Recipe[];
}

const RecipesClient: React.FC<RecipesClientProps> = ({ formattedCardData }) => {
  const { visibleItems, showMore } = usePaginationStore();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div className="m-4">
      <ScrollButton />
      <h1 className="h-0 opacity-0">Rezepte</h1>
      <FilterBar
        onShowFavorites={(favs: Recipe[]) => {
          setFavorites(favs);
          setShowFavorites(true);
        }}
        onHideFavorites={() => setShowFavorites(false)}
      />

      {showFavorites ? (
        favorites.length > 0 ? (
          <CardListWrapper
            cardData={favorites.slice(0, visibleItems)}
            showDetail={true}
            showBookmark={true}
            style={LayoutOptions.GRID}
          />
        ) : (
          <div className="flex h-[45vh] w-full flex-col items-center pt-10">
            <Typography variant="heading3">
              <p className="text-sfblack">Keine Favoriten gefunden</p>
            </Typography>
          </div>
        )
      ) : formattedCardData.length > 0 ? (
        <>
          <CardListWrapper
            cardData={formattedCardData.slice(0, visibleItems)}
            showDetail={true}
            showBookmark={true}
            style={LayoutOptions.GRID}
          />
          {visibleItems < formattedCardData.length && (
            <div className="flex w-full justify-center">
              <Button
                label="mehr"
                size={ButtonSize.SMALL}
                iconRight={<Arrow />}
                onClick={showMore}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex h-[45vh] w-full flex-col items-center pt-10">
          <Typography variant="heading3">
            <p className="text-sfblack">OOPS!</p>
          </Typography>
          <Typography variant="body">
            <span className="text-sfblack">
              Wir haben keine Ergebnisse für Ihre Suche gefunden...
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default RecipesClient;
