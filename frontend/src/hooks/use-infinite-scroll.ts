import { useState, useCallback, useEffect } from "react";
import { Recipe } from "@/services/recipe/recipeService";
import useMediaQuery from "./use-media-query";

interface UseInfiniteScrollProps {
  items: Recipe[];
}

export const useInfiniteScroll = ({ items }: UseInfiniteScrollProps) => {
  const [visibleItems, setVisibleItems] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const resetItems = useCallback(() => {
    const initialItems = isDesktop ? 6 : 3;
    setVisibleItems(items.slice(0, initialItems));
    setHasMore(items.length > initialItems);
  }, [items, isDesktop]);

  useEffect(() => {
    resetItems();
  }, [resetItems]);

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

  return { visibleItems, hasMore, loadMore };
};
