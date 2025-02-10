import { getRecipeDetail } from "@/utils/recipeDetail";
import { getRecipeTags, TagData } from "@/services/tag/tagService";
import { getUser } from "@/services/user/userService";
import { RecipePageClient } from "@/components/recipe-page-client/recipe-page-client";

/*
  @desc Displays the recipe page
*/
export default async function RecipePage({
  params,
}: {
  params: { id: number };
}) {
  // retrieve the recipe id
  const recipeId = params.id;

  // retrieve the recipe details
  const recipeDetails = await getRecipeDetail(recipeId);

  // if there is no recipe details, return null
  if (!recipeDetails) return null;

  // retrieve the user id
  const userId =
    typeof recipeDetails.user_id === "string"
      ? Number(recipeDetails.user_id)
      : recipeDetails.user_id;

  // retrieve the user
  const user = await getUser(userId);

  // if there is no user, return null
  if (!user) return null;

  // retrieve the season tags
  const seasonData = await getRecipeTags(recipeDetails.id);

  // format the season tags
  const seasonTags = recipeDetails.season
    .map((tagId: number) => {
      const tag = seasonData.find((t: TagData) => t.id === tagId);
      return tag ? tag.name : "";
    })
    .filter(Boolean)
    .join(", ");

  // format the season tags
  const seasonArray = seasonTags
    .split(",")
    .map((season: string) => season.trim());

  // return the recipe page client
  return (
    <RecipePageClient
      recipeDetails={recipeDetails}
      user={user}
      seasonTags={seasonTags}
      seasonArray={seasonArray}
      recipeId={recipeId}
    />
  );
}
