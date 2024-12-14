import RecipesClient from "@/components/recipes-client/recipes-client";
import { getCurrentSeason } from "@/utils/SeasonUtils";
import { dataFetch } from "@/utils/data-fetch";

interface Recipe {
  id: number;
  title: string;
  prep_time: number;
}

interface ImageData {
  file_path: string;
  alt_text: string;
}

interface TagData {
  name: string;
}

const RecipesPage = async ({
  searchParams,
}: {
  searchParams?: { title?: string };
}) => {
  const seasonName = getCurrentSeason();
  const title = searchParams?.title || "";

  const cardData: Recipe[] = await dataFetch(
    `${process.env.BACKEND_URL}/api/recipe?tags[]=all_year&tags[]=${seasonName}${title ? `&title=${encodeURIComponent(title)}` : ""}`,
  );

  const formattedCardData = Array.isArray(cardData)
    ? await Promise.all(
        cardData.map(async (recipe: Recipe) => {
          const imageData: ImageData[] = await dataFetch(
            `${process.env.BACKEND_URL}/api/images?type=recipe&recipe_id=${recipe.id}`,
          );

          const seasonData: TagData[] = await dataFetch(
            `${process.env.BACKEND_URL}/api/recipes/${recipe.id}/tags`,
          );

          const firstImage = imageData[0] || {};
          const seasonTags = seasonData
            .map((tag: TagData) => tag.name)
            .join(", ");

          return {
            id: recipe.id,
            imageSrc: firstImage.file_path || "",
            // imageSrc,
            imageAlt: firstImage.alt_text || recipe.title,
            title: recipe.title,
            prepDuration: recipe.prep_time,
            season: seasonTags,
          };
        }),
      )
    : [];

  return <RecipesClient formattedCardData={formattedCardData} />;
};

export default RecipesPage;
