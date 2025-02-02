"use client";

import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import FilterBar from "@/components/filter-bar/filter-bar";
import { Typography } from "@/components/ui/typography";
import { LayoutOptions } from "@/utils/layout-options";
import { Recipe } from "@/services/recipe/recipeService";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

interface RecipesClientProps {
  formattedCardData: Recipe[];
}

const RecipesClient: React.FC<RecipesClientProps> = ({ formattedCardData }) => {
  const { visibleItems, hasMore, loadMore } = useInfiniteScroll({
    items: formattedCardData,
  });

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
            style={LayoutOptions.GRID}
          />
        </InfinityScroll>
      ) : (
        <div className="flex h-[45vh] w-full flex-col items-center pt-10">
          <Typography variant="heading3">
            {/* TODO: Add a nice image */}
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
