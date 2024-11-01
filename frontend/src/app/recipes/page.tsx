import CardListWrapper from "@/components/card-list-wrapper/card-list-wrapper";
import { LayoutOptions } from "@/components/card-list.tsx/card-list";
import dataFetch from "@/utils/data-fetch";
import ScrollButton from "@/components/scroll-button/scroll-button";

const Recipes = async () => {
  const cardData = await dataFetch("http://127.0.0.1:8000/api/recipe");

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

  console.log(formattedCardData);

  return (
    <div className="m-4">
      <ScrollButton />
      <h1 className="h-0 opacity-0">Rezepte</h1>
      {/* Insert Recipe filter bar */}
      <CardListWrapper
        cardData={formattedCardData}
        showDetail={true}
        style={LayoutOptions.GRID}
      ></CardListWrapper>
    </div>
  );
};

export default Recipes;
