"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import { Button, ButtonSize } from "@/components/button/button";
import Link from "next/link";
import { Recipe } from "@/services/recipe/recipeService";
import { UserData } from "@/services/user/userService";
import NoRecipesImage from "@/assets/images/no-recipes-image.svg";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import { LayoutOptions } from "@/utils/layout-options";
import useMediaQuery from "@/hooks/use-media-query";

interface MyRecipesClientProps {
  cardData: Recipe[];
  user: UserData;
}

const MyRecipesClient: React.FC<MyRecipesClientProps> = ({
  cardData,
  user,
}) => {
  const [visibleItems, setVisibleItems] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    const initialItems = isDesktop ? 6 : 3;
    setVisibleItems(cardData.slice(0, initialItems));
    setHasMore(cardData.length > initialItems);
  }, [cardData, pathname, isDesktop]);

  const loadMore = () => {
    if (!isLoading) {
      setIsLoading(true);
      const currentLength = visibleItems.length;
      const batchSize = isDesktop ? 6 : 3;
      const more = cardData.slice(currentLength, currentLength + batchSize);

      requestAnimationFrame(() => {
        setVisibleItems((prev) => [...prev, ...more]);
        setHasMore(currentLength + more.length < cardData.length);
        setIsLoading(false);
      });
    }
  };

  return (
    <div className="m-4">
      <ScrollButton />
      <div className="flex items-center justify-between px-1 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>meine Rezepte</h1>
        </Typography>
        <Link href={"/recipes/create"}>
          <Button label="Rezept erstellen" size={ButtonSize.SMALL} />
        </Link>
      </div>
      {cardData.length > 0 ? (
        <InfinityScroll
          loadMore={loadMore}
          hasMore={hasMore}
          className="transition-opacity duration-500"
        >
          <CardListWrapper
            cardData={visibleItems}
            showDetail={true}
            showEdit={true}
            style={LayoutOptions.GRID}
            user={user}
          />
        </InfinityScroll>
      ) : (
        <div className="flex h-[45vh] w-full flex-col items-center pt-10">
          <div className="fit-cover w-76 h-40 min-[640px]:h-60 min-[640px]:w-96">
            <NoRecipesImage className="h-full w-full" />
          </div>
          <Typography variant="small" className="mt-2 text-center">
            <span className="text-sfblack">
              Du hast noch keine eigenen Rezepte erstellt.
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MyRecipesClient;
