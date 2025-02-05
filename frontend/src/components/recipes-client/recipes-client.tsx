"use client";

import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import FilterBar from "@/components/filter-bar/filter-bar";
import { Typography } from "@/components/ui/typography";
import { CardLayoutOptions } from "@/utils/card-layout-options";
import { Recipe } from "@/services/recipe/recipeService";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import SearchImage from "@/assets/images/search-image.svg";
import { useEffect } from "react";
import { useRecipes } from "@/hooks/use-recipes";

interface RecipesClientProps {
  formattedCardData: Recipe[];
}

const RecipesClient: React.FC<RecipesClientProps> = ({ formattedCardData }) => {
  const { visibleItems, hasMore, loadMore } = useInfiniteScroll({
    items: formattedCardData,
  });
  const { setRecipes, recipes } = useRecipes();

  useEffect(() => {
    if (JSON.stringify(formattedCardData) !== JSON.stringify(recipes)) {
      setRecipes(formattedCardData);
    }
  }, [formattedCardData, setRecipes, recipes]);

  return (
    <div className="m-4">
      <ScrollButton />
      <h1 className="h-0 opacity-0">Rezepte</h1>
      <FilterBar />
      {formattedCardData.length > 0 ? (
        <InfinityScroll
          loadMore={loadMore}
          hasMore={hasMore}
          className="transition-opacity duration-500"
        >
          <CardListWrapper
            cardData={visibleItems}
            showDetail={true}
            showBookmark={true}
            style={CardLayoutOptions.GRID}
          />
        </InfinityScroll>
      ) : (
        <div className="flex h-[45vh] w-full flex-col items-center justify-center pt-10">
          <SearchImage className="h-40 w-full min-[640px]:h-60" />
          <Typography variant="heading3" className="mt-6">
            <p className="text-sfblack">OOPS!</p>
          </Typography>
          <Typography variant="body">
            <span className="text-sfblack">
              Diese Suche ist nicht auf unserer Speisekarte...
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default RecipesClient;
