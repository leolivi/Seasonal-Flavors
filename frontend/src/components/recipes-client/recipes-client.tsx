"use client";

import { CardLayoutOptions } from "@/utils/card-layout-options";
import { SessionLoader } from "../auth-session/auth-session";
import { Typography } from "@/components/ui/typography";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import FilterBar from "@/components/filter-bar/filter-bar";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import ScrollButton from "@/components/scroll-button/scroll-button";
import SearchImage from "@/assets/images/search-image.svg";
import { RecipeData } from "@/types/interfaces";

interface RecipesClientProps {
  formattedCardData: RecipeData[];
}

/*
  @desc Recipes client
*/
const RecipesClient: React.FC<RecipesClientProps> = ({ formattedCardData }) => {
  // get the visible items, has more, load more, and render loader
  const { visibleItems, hasMore, loadMore, renderLoader } = useInfiniteScroll({
    items: formattedCardData,
  });

  // get the session status
  const { status } = useSession();

  // set the loading state
  const [isLoading, setIsLoading] = useState(true);

  // set the loading state to false when the component is mounted
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // if the status is loading or the component is loading, return the session loader
  if (status === "loading" || isLoading) {
    return <SessionLoader />;
  }

  return (
    <div className="m-4">
      {/* heading */}
      <h1 className="h-0 opacity-0" aria-label="Rezepte" tabIndex={0}>
        Rezepte
      </h1>

      {/* filter bar */}
      <FilterBar />

      {/* recipes */}
      {formattedCardData.length > 0 ? (
        <InfinityScroll
          loadMore={loadMore}
          hasMore={hasMore}
          className="transition-opacity duration-500"
        >
          <CardListWrapper
            cardData={visibleItems}
            viewOptions={{
              showDetail: true,
              showBookmark: true,
              style: CardLayoutOptions.GRID,
            }}
            initialRecipes={formattedCardData}
          />
        </InfinityScroll>
      ) : (
        // if there are no recipes, render the search image
        <div className="flex h-[45vh] w-full flex-col items-center justify-center pt-10">
          <SearchImage className="h-40 w-full min-[640px]:h-60" />
          <Typography variant="heading3" className="mt-6">
            <p className="text-sfblack">OOPS!</p>
          </Typography>
          <Typography variant="body">
            <span
              className="text-sfblack"
              aria-label="Keine Ergebnisse gefunden"
              tabIndex={0}
            >
              Diese Suche ist nicht auf unserer Speisekarte...
            </span>
          </Typography>
        </div>
      )}

      {/* render loader */}
      {renderLoader()}

      {/* scroll button */}
      <ScrollButton />
    </div>
  );
};

export default RecipesClient;
