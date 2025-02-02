import RecipesClient from "@/components/recipes-client/recipes-client";
import { getRecipeImage } from "@/services/image/imageService";
import { getFilteredRecipes, Recipe } from "@/services/recipe/recipeService";
import { getRecipeTags } from "@/services/tag/tagService";
import { getCurrentSeason } from "@/utils/SeasonUtils";

const RecipesPage = async ({
  searchParams,
}: {
  searchParams?: { title?: string; season?: string };
}) => {
  const currentSeason = getCurrentSeason();
  const title = searchParams?.title || "";
  const season = searchParams?.season || currentSeason;

  const recipes = await getFilteredRecipes(season, title);
  if (!recipes) return <div>Keine Rezepte gefunden</div>;

  const formattedRecipes: Recipe[] = await Promise.all(
    recipes.map(async (recipe) => {
      const imageData = await getRecipeImage(recipe.id);
      const seasonData = await getRecipeTags(recipe.id);

      return {
        ...recipe,
        imageSrc: imageData?.file_path,
        imageAlt: imageData?.alt_text,
        season: Array.isArray(seasonData)
          ? seasonData.map((tag) => tag.name).join(", ")
          : "",
      };
    }),
  );

  return <RecipesClient formattedCardData={formattedRecipes} />;
};

export default RecipesPage;
