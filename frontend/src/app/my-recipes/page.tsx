import { getAuthenticatedUser } from "@/utils/auth-user";
import { getRecipeDetail } from "@/utils/recipeDetail";
import { getRecipeTags } from "@/services/tag/tagService";
import { getUserRecipes } from "@/services/recipe/recipeService";
import MyRecipesClient from "@/components/my-recipes-client/my-recipes-client";

export const dynamic = "force-dynamic";

/*
  @return array|Response
  @desc Displays the my recipes page
*/
const MyRecipesPage = async () => {
  // retrieve the user
  const user = await getAuthenticatedUser();

  // if there is no user, return null
  if (!user) return null;

  // retrieve the recipes
  const cardData = await getUserRecipes(user.id);

  // if there is no recipes, return null
  if (!cardData) return null;

  // format the recipes
  const formattedCardData = (
    await Promise.all(
      cardData.map(async (recipe) => {
        const recipeDetails = await getRecipeDetail(recipe.id);
        if (!recipeDetails) return null;

        // retrieve the season tags
        const seasonData = await getRecipeTags(recipe.id);

        // format the season tags
        const seasonTags = recipeDetails.season
          .map((tagId: number) => {
            const tag = seasonData.find((t) => t.id === tagId);
            return tag ? tag.name : "";
          })
          .filter(Boolean)
          .join(", ");

        // return the formatted recipe
        return {
          ...recipe,
          imageSrc: recipeDetails.imageSrc,
          imageAlt: recipeDetails.imageAlt,
          season: seasonTags,
        };
      }),
    )
  ).filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== null);

  // return the my recipes client
  return <MyRecipesClient cardData={formattedCardData} user={user} />;
};

export default MyRecipesPage;
