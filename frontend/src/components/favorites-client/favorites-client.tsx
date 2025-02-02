"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Recipe } from "@/services/recipe/recipeService";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import { Typography } from "@/components/ui/typography";
import { LayoutOptions } from "@/utils/layout-options";
import ScrollButton from "../scroll-button/scroll-button";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

const FavoritesClient = () => {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const { loadFavorites, getDetailedFavorites } = useFavoritesStore();

  const { visibleItems, hasMore, loadMore } = useInfiniteScroll({
    items: favorites,
  });

  useEffect(() => {
    const initializeFavorites = async () => {
      if (session?.accessToken) {
        await loadFavorites(session.accessToken);
        const detailedFavorites = await getDetailedFavorites();
        setFavorites(detailedFavorites);
      }
    };

    initializeFavorites();
  }, [session]);

  const onShowFavorites = async (updatedFavorites: Recipe[]) => {
    setFavorites(updatedFavorites);
  };

  return (
    <div className="m-4">
      <ScrollButton />
      <div className="flex items-center justify-between px-1 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>meine Favoriten</h1>
        </Typography>
      </div>

      {favorites.length > 0 ? (
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
            isInFavoriteView={true}
            onShowFavorites={onShowFavorites}
          />
        </InfinityScroll>
      ) : (
        <div className="flex h-[45vh] w-full flex-col items-center pt-10">
          <Typography variant="heading3">
            {/* TODO: Add a nice image */}
            <p className="text-sfblack">Keine Favoriten gefunden</p>
          </Typography>
          <Typography variant="body">
            <span className="text-sfblack">
              Füge Rezepte zu deinen Favoriten hinzu, um sie hier zu sehen.
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default FavoritesClient;
