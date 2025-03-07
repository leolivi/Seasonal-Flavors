"use client";
import { CardLayoutOptions } from "@/utils/card-layout-options";
import { RecipeData } from "@/types/interfaces";
import { SessionLoader } from "../auth-session/auth-session";
import { Typography } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useSession } from "next-auth/react";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import ScrollButton from "../scroll-button/scroll-button";
import SearchImage from "@/assets/images/search-image.svg";

/*
  @desc Displays the favorites client
*/
const FavoritesClient = () => {
  // get the session
  const { data: session, status } = useSession();
  // set the favorites state
  const [favorites, setFavorites] = useState<RecipeData[]>([]);
  // set the loading state
  const [isLoading, setIsLoading] = useState(true);
  // get the favorites store
  const { loadFavorites, getDetailedFavorites } = useFavoritesStore();
  // get the infinite scroll
  const { visibleItems, hasMore, loadMore, renderLoader } = useInfiniteScroll({
    items: favorites,
  });

  // initialize the favorites
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

  // update the favorites
  const onShowFavorites = async (updatedFavorites: RecipeData[]) => {
    setFavorites(updatedFavorites);
  };

  // render the session loader if the session is loading or the favorites are loading
  if (status === "loading" || isLoading) {
    return <SessionLoader />;
  }

  // render the favorites client
  return (
    <div className="m-4">
      <div className="flex items-center justify-between px-1 min-[640px]:px-4">
        {/* heading */}
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1 aria-label="meine Favoriten" tabIndex={0}>
            meine Favoriten
          </h1>
        </Typography>
      </div>
      {favorites.length > 0 ? (
        <InfinityScroll
          loadMore={loadMore}
          hasMore={hasMore}
          className="transition-opacity duration-500"
        >
          {/* card list wrapper */}
          <CardListWrapper
            cardData={visibleItems}
            viewOptions={{
              showDetail: true,
              showBookmark: true,
              style: CardLayoutOptions.GRID,
            }}
            isInFavoriteView={true}
            onShowFavorites={onShowFavorites}
          />
        </InfinityScroll>
      ) : (
        // no favorites message
        <div className="flex h-[45vh] w-full flex-col items-center justify-center pt-10">
          <SearchImage className="h-40 w-full min-[640px]:h-60" />
          <Typography variant="heading3" className="mt-6">
            <p className="text-sfblack">Keine Favoriten gefunden</p>
          </Typography>
          <Typography variant="body">
            <span
              className="text-sfblack"
              aria-label="Keine Favoriten gefunden"
              tabIndex={0}
            >
              Füge Rezepte zu deinen Favoriten hinzu, um sie hier zu sehen.
            </span>
          </Typography>
        </div>
      )}
      {/* render the SessionLoader */}
      {renderLoader()}
      {/* scroll button */}
      <ScrollButton />
    </div>
  );
};

export default FavoritesClient;
