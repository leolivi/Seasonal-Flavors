import { getAuthenticatedUser } from "@/utils/auth-user";
import { getUserRecipes } from "@/services/recipe/recipeService";
import MyRecipesClient from "@/components/my-recipes-client/my-recipes-client";
import { formatRecipeData } from "@/utils/recipe-formatting";

export const dynamic = "force-dynamic";

/*
  @desc Displays the my recipes page
*/
const MyRecipesPage = async () => {
  // retrieve the user
  const user = await getAuthenticatedUser();
  if (!user) return null;

  // retrieve the recipes
  const cardData = await getUserRecipes(user.id);
  if (!cardData) return null;

  // retrive formatted recipes
  const formattedCardData = await formatRecipeData(cardData);

  // return the recipes client
  return <MyRecipesClient cardData={formattedCardData} />;
};

export default MyRecipesPage;
