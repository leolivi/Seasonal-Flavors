"use client";
import { useEffect, useState } from "react";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/button/button";
import Link from "next/link";
import { RecipeData } from "@/types/interfaces";
import NoRecipesImage from "@/assets/images/no-recipes-image.svg";
import InfinityScroll from "../infinity-scroll/infinity-scroll";
import { CardLayoutOptions } from "@/utils/card-layout-options";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { SessionLoader } from "../auth-session/auth-session";
import { useSession } from "next-auth/react";
import { ButtonSize } from "@/utils/enum";
import { trackAction } from "@/components/analytics/action-tracker";

interface MyRecipesClientProps {
  cardData: RecipeData[];
}

/*
  @desc My recipes client
*/
const MyRecipesClient: React.FC<MyRecipesClientProps> = ({ cardData }) => {
  // get the infinite scroll data
  const { visibleItems, hasMore, loadMore, renderLoader } = useInfiniteScroll({
    items: cardData,
  });
  // get the session status
  const { status } = useSession();
  // get the loading state
  const [isLoading, setIsLoading] = useState(true);

  // set the loading state to false
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // render the session loader if the session is loading or the loading state is true
  if (status === "loading" || isLoading) {
    return <SessionLoader />;
  }

  // render the component
  return (
    <div className="m-4">
      <div className="flex flex-col items-center justify-between px-1 min-[640px]:flex-row min-[640px]:px-4">
        {/* heading */}
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1 aria-label="meine Rezepte" tabIndex={0}>
            meine Rezepte
          </h1>
        </Typography>
        {/* create recipe button */}
        <Link
          href={"/recipes/create"}
          onClick={() =>
            trackAction("click_create_recipe", {
              action: "/recipes/create",
              source: "/my-recipes",
            })
          }
        >
          <Button label="Rezept erstellen" size={ButtonSize.SMALL} />
        </Link>
      </div>
      {/* render the card list */}
      {cardData.length > 0 ? (
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
              showEdit: true,
              style: CardLayoutOptions.GRID,
            }}
            initialRecipes={cardData}
          />
        </InfinityScroll>
      ) : (
        // in no recipes are found
        <div className="flex h-[45vh] w-full flex-col items-center pt-10">
          <div className="fit-cover w-76 h-40 min-[640px]:h-60 min-[640px]:w-96">
            <NoRecipesImage className="h-full w-full" />
          </div>
          <Typography variant="small" className="mt-2 text-center">
            <span
              className="text-sfblack"
              aria-label="Keine eigenen Rezepte gefunden"
              tabIndex={0}
            >
              Du hast noch keine eigenen Rezepte erstellt.
            </span>
          </Typography>
        </div>
      )}
      {/* render the loader */}
      {renderLoader()}
      {/* rscroll button */}
      <ScrollButton />
    </div>
  );
};

export default MyRecipesClient;
