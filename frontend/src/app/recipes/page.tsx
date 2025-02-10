import { getCurrentSeason } from "@/utils/SeasonUtils";
import { getFilteredRecipes, Recipe } from "@/services/recipe/recipeService";
import { getRecipeImage } from "@/services/image/imageService";
import { getRecipeTags } from "@/services/tag/tagService";
import { SessionLoader } from "@/components/auth-session/auth-session";
import RecipesClient from "@/components/recipes-client/recipes-client";

export const dynamic = "force-dynamic";

/*
  @desc Displays the recipes page
*/
const RecipesPage = async ({
  searchParams,
}: {
  searchParams?: { title?: string; season?: string };
}) => {
  // retrieve the current season
  const currentSeason = getCurrentSeason();

  // retrieve the title and season
  const title = searchParams?.title || "";
  const season = searchParams?.season || currentSeason;

  // retrieve the recipes
  const recipes = await getFilteredRecipes(season, title);
  if (!recipes)
    return (
      <div className="flex flex-col items-center justify-center">
        Keine Rezepte gefunden <SessionLoader size="small" />
      </div>
    );

  // format the recipes
  const formattedRecipes: Recipe[] = await Promise.all(
    recipes.map(async (recipe) => {
      const imageData = await getRecipeImage(recipe.id);
      const seasonData = await getRecipeTags(recipe.id);

      // return the formatted recipe
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

  // return the recipes client
  return <RecipesClient formattedCardData={formattedRecipes} />;
};

export default RecipesPage;
