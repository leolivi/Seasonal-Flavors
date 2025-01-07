"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import { Button, ButtonSize } from "@/components/button/button";
import Arrow from "src/assets/icons/arrow.svg";
import { LayoutOptions } from "@/utils/layout-options";
import Link from "next/link";
import { Recipe } from "@/services/recipe/recipeService";
import { usePaginationStore } from "@/stores/paginationStore";
import NoRecipesImage from "@/assets/images/no-recipes-image.svg";

interface MyRecipesClientProps {
  cardData: Recipe[];
}

const MyRecipesClient: React.FC<MyRecipesClientProps> = ({ cardData }) => {
  const { visibleItems, showMore, resetPagination } = usePaginationStore();
  const pathname = usePathname();

  useEffect(() => {
    resetPagination();
  }, [pathname, resetPagination]);

  return (
    <div className="m-4">
      <ScrollButton />
      <div className="flex items-center justify-between px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>meine Rezepte</h1>
        </Typography>
        <Link href={"/recipes/create"}>
          <Button label="Rezept erstellen" size={ButtonSize.SMALL} />
        </Link>
      </div>

      {cardData.length > 0 ? (
        <>
          <CardListWrapper
            cardData={cardData.slice(0, visibleItems)}
            showDetail={true}
            showEdit={true}
            style={LayoutOptions.GRID}
          />
          {visibleItems < cardData.length && (
            <div className="flex w-full justify-center">
              <Button
                label="mehr"
                size={ButtonSize.SMALL}
                iconRight={<Arrow />}
                onClick={showMore}
              />
            </div>
          )}
        </>
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
