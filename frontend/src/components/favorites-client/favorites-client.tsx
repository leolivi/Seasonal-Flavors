"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Recipe } from "@/services/recipe/recipeService";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import { Typography } from "@/components/ui/typography";
import { CardLayoutOptions } from "@/utils/card-layout-options";
import ScrollButton from "../scroll-button/scroll-button";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import SearchImage from "@/assets/images/search-image.svg";
import { SessionLoader } from "../auth-session/auth-session";

const FavoritesClient = () => {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loadFavorites, getDetailedFavorites } = useFavoritesStore();
  const { visibleItems, hasMore, loadMore } = useInfiniteScroll({
    items: favorites,
  });

  useEffect(() => {
    const initializeFavorites = async () => {
      if (session?.accessToken) {
        setIsLoading(true);
        try {
          await loadFavorites(session.accessToken);
          const detailedFavorites = await getDetailedFavorites();
          setFavorites(detailedFavorites);
        } catch (error) {
          console.error("Failed to load favorites:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeFavorites();
  }, [session, loadFavorites, getDetailedFavorites]);

  const onShowFavorites = async (updatedFavorites: Recipe[]) => {
    setFavorites(updatedFavorites);
  };

  if (status === "loading" || isLoading) {
    return <SessionLoader />;
  }

  return (
    <div className="m-4">
      <ScrollButton />
      <div className="flex items-center justify-between px-1 min-[640px]:px-4">
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
            style={CardLayoutOptions.GRID}
            isInFavoriteView={true}
            onShowFavorites={onShowFavorites}
          />
        </InfinityScroll>
      ) : (
        <div className="flex h-[45vh] w-full flex-col items-center justify-center pt-10">
          <SearchImage className="h-40 w-full min-[640px]:h-60" />
          <Typography variant="heading3" className="mt-6">
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
