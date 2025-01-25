"use client";
import { useEffect, useState, useCallback } from "react";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import FilterBar from "@/components/filter-bar/filter-bar";
import { Typography } from "@/components/ui/typography";
import { LayoutOptions } from "@/utils/layout-options";
import { Recipe } from "@/services/recipe/recipeService";
import { usePathname } from "next/navigation";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import useMediaQuery from "@/hooks/use-media-query";

interface RecipesClientProps {
  formattedCardData: Recipe[];
}

const RecipesClient: React.FC<RecipesClientProps> = ({ formattedCardData }) => {
  const [visibleItems, setVisibleItems] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const resetItems = useCallback(() => {
    const initialItems = isDesktop ? 6 : 3;
    setVisibleItems(formattedCardData.slice(0, initialItems));
    setHasMore(formattedCardData.length > initialItems);
  }, [formattedCardData, isDesktop]);

  useEffect(() => {
    resetItems();
  }, [pathname, resetItems]);

  const loadMore = () => {
    if (!isLoading) {
      setIsLoading(true);
      const currentLength = visibleItems.length;
      const batchSize = isDesktop ? 6 : 3;
      const more = formattedCardData.slice(
        currentLength,
        currentLength + batchSize,
      );

      requestAnimationFrame(() => {
        setVisibleItems((prev) => [...prev, ...more]);
        setHasMore(currentLength + more.length < formattedCardData.length);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="m-4">
      <ScrollButton />
      <h1 className="h-0 opacity-0">Rezepte</h1>
      <FilterBar
        onShowFavorites={(favs: Recipe[]) => {
          setFavorites(favs);
          setShowFavorites(true);
        }}
        onHideFavorites={() => {
          setShowFavorites(false);
          resetItems();
        }}
      />
      {showFavorites ? (
        favorites.length > 0 ? (
          <CardListWrapper
            cardData={favorites}
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
