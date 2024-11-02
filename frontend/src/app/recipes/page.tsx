import { useSearchParams } from "next/navigation";
import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import { LayoutOptions } from "@/components/card-list.tsx/card-list";
import dataFetch from "@/utils/data-fetch";
import ScrollButton from "@/components/scroll-button/scroll-button";
import FilterBar from "@/components/filter-bar/filter-bar";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/button/button";
import Arrow from "src/assets/icons/arrow.svg";

interface RecipesProps {
  searchParams?: { title?: string };
}

const Recipes = async ({ searchParams }: RecipesProps) => {
  const title = (await searchParams?.title) || "";

  const cardData = await dataFetch(
    `http://127.0.0.1:8000/api/recipe${title ? `?title=${encodeURIComponent(title)}` : ""}`,
  );

  const formattedCardData = await Promise.all(
    cardData.map(async (recipe: any) => {
      const imageData = await dataFetch(
        `http://127.0.0.1:8000/api/images?recipe_id=${recipe.id}`,
      );
      const seasonData = await dataFetch(
        `http://127.0.0.1:8000/api/recipes/${recipe.id}/tags`,
      );

      const firstImage = imageData[0] || {};

      const seasonTags = seasonData.map((tag: any) => tag.name).join(", ");

      return {
        id: recipe.id,
        imageSrc: firstImage.file_path || "",
        imageAlt: firstImage.alt_text || recipe.title,
        title: recipe.title,
        prepDuration: recipe.prep_time,
        season: seasonTags,
      };
    }),
  );

  return (
    <div className="m-4">
      <ScrollButton />
      <h1 className="h-0 opacity-0">Rezepte</h1>
      <FilterBar title={title} />
      {formattedCardData.length > 0 ? (
        <CardListWrapper
          cardData={formattedCardData}
          showDetail={true}
          style={LayoutOptions.GRID}
        />
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
      <div className="flex w-full justify-center">
        <Button label="mehr" icon={<Arrow />}></Button>
      </div>
    </div>
  );
};

export default Recipes;
