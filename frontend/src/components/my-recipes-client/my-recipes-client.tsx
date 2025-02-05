"use client";
import { useEffect } from "react";
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
import { useRecipes } from "@/hooks/use-recipes";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

interface MyRecipesClientProps {
  cardData: Recipe[];
  user: UserData;
}

const MyRecipesClient: React.FC<MyRecipesClientProps> = ({
  cardData,
  user,
}) => {
  const { visibleItems, hasMore, loadMore } = useInfiniteScroll({
    items: cardData,
  });
  const { setRecipes, recipes } = useRecipes();

  useEffect(() => {
    if (JSON.stringify(cardData) !== JSON.stringify(recipes)) {
      setRecipes(cardData);
    }
  }, [cardData, setRecipes, recipes]);

  return (
    <div className="m-4">
      <ScrollButton />
      <div className="flex items-center justify-between px-1 min-[640px]:px-4">
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
