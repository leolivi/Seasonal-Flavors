import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import dataFetch from "@/utils/data-fetch";
import ScrollButton from "@/components/scroll-button/scroll-button";
import FilterBar from "@/components/filter-bar/filter-bar";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/button/button";
import Arrow from "src/assets/icons/arrow.svg";
import { getCurrentSeason } from "@/utils/SeasonUtils";
import { LayoutOptions } from "@/utils/layout-options";

interface RecipesProps {
  searchParams?: { title?: string };
}

interface Recipe {
  id: number;
  title: string;
  prep_time: number;
}

interface SeasonTag {
  name: string;
}

const Recipes = async ({ searchParams }: RecipesProps) => {
  // TODO: Add the season filter
  // const seasonName = getCurrentSeason();

  // Fetch the recipe data and added search filter
  const title = (await searchParams?.title) || "";

  const cardData = await dataFetch(
    // `http://127.0.0.1:8000/api/recipe?tags[]=${seasonName}`,
    `${process.env.BACKEND_URL}/api/recipe${title ? `?title=${encodeURIComponent(title)}` : ""}`,
  );

  if (!Array.isArray(cardData)) {
    console.error("Expected cardData to be an array, but got:", cardData);
    return;
  }

  const formattedCardData = await Promise.all(
    // Map through recipe data (cards)
    cardData.map(async (recipe: Recipe) => {
      // Fetch image data
      const imageData = await dataFetch(
        `http://127.0.0.1:8000/api/images?recipe_id=${recipe.id}`,
      );
      // Fetch season data
      const seasonData = await dataFetch(
        `http://127.0.0.1:8000/api/recipes/${recipe.id}/tags`,
      );

      const firstImage = imageData[0] || {};

      const seasonTags = seasonData
        .map((tag: SeasonTag) => tag.name)
        .join(", ");

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
        <Button label="mehr" iconRight={<Arrow />}></Button>
      </div>
    </div>
  );
};

export default Recipes;
