import { getCurrentSeason } from "@/utils/SeasonUtils";
import { getFilteredRecipes, Recipe } from "@/services/recipe/recipeService";
import { getRecipeImage } from "@/services/image/imageService";
import { getRecipeTags } from "@/services/tag/tagService";
import { SessionLoader } from "@/components/auth-session/auth-session";
import RecipesClient from "@/components/recipes-client/recipes-client";
import { formatRecipeData } from "@/utils/recipe-formatting";

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

  // fetch formatted recipes
  const formattedRecipes = await formatRecipeData(recipes);

  // return the recipes client
  return <RecipesClient formattedCardData={formattedRecipes} />;
};

export default RecipesPage;
