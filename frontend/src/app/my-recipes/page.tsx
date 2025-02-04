import { getAuthenticatedUser } from "@/utils/auth-user";
import { getUserRecipes } from "@/services/recipe/recipeService";
import { getRecipeDetail } from "@/utils/recipeDetail";
import { getRecipeTags } from "@/services/tag/tagService";
import MyRecipesClient from "@/components/my-recipes-client/my-recipes-client";

// export const dynamic = "force-dynamic";

const MyRecipesPage = async () => {
  const user = await getAuthenticatedUser();

  if (!user) return null;

  const cardData = await getUserRecipes(user.id);
  if (!cardData) return null;

  const formattedCardData = (
    await Promise.all(
      cardData.map(async (recipe) => {
        const recipeDetails = await getRecipeDetail(recipe.id);
        if (!recipeDetails) return null;

        const seasonData = await getRecipeTags(recipe.id);

        const seasonTags = recipeDetails.season
          .map((tagId: number) => {
            const tag = seasonData.find((t) => t.id === tagId);
            return tag ? tag.name : "";
          })
          .filter(Boolean)
          .join(", ");

        return {
          ...recipe,
          imageSrc: recipeDetails.imageSrc,
          imageAlt: recipeDetails.imageAlt,
          season: seasonTags,
        };
      }),
    )
  ).filter((recipe): recipe is NonNullable<typeof recipe> => recipe !== null);

  return <MyRecipesClient cardData={formattedCardData} user={user} />;
};

export default MyRecipesPage;
