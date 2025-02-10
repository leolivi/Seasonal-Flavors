import { SessionLoader } from "@/components/auth-session/auth-session";
import { useState, useCallback, useEffect } from "react";
import useMediaQuery from "./use-media-query";
import { RecipeData } from "@/types/interfaces";

interface UseInfiniteScrollProps {
  items: RecipeData[];
}

/*
  @desc Hook to handle infinite scroll for recipe cards
*/
export const useInfiniteScroll = ({ items }: UseInfiniteScrollProps) => {
  // state for the visible items
  const [visibleItems, setVisibleItems] = useState<RecipeData[]>([]);
  // state for the has more items
  const [hasMore, setHasMore] = useState(true);
  // state for the loading state
  const [isLoading, setIsLoading] = useState(false);
  // state for the desktop media query
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const resetItems = useCallback(() => {
    const initialItems = isDesktop ? 6 : 3;
    setVisibleItems(items.slice(0, initialItems));
    setHasMore(items.length > initialItems);
  }, [items, isDesktop]);

  useEffect(() => {
    resetItems();
  }, [resetItems]);

  // load more items
  const loadMore = () => {
    if (!isLoading) {
      setIsLoading(true);
      const currentLength = visibleItems.length;
      const batchSize = isDesktop ? 6 : 3;
      const more = items.slice(currentLength, currentLength + batchSize);

      requestAnimationFrame(() => {
        setVisibleItems((prev) => [...prev, ...more]);
        setHasMore(currentLength + more.length < items.length);
        setIsLoading(false);
      });
    }
  };

  // render the session loader when isLoading is true
  const renderLoader = () => {
    if (isLoading) {
      return <SessionLoader size="small" />;
    }
    return null;
  };

  return { visibleItems, hasMore, loadMore, renderLoader };
};
