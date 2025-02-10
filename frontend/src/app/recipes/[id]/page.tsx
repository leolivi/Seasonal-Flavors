import { getRecipeDetail } from "@/utils/recipe-detail";
import { getRecipeTags } from "@/services/tag/tagService";
import { getUser } from "@/services/user/userService";
import { RecipePageClient } from "@/components/recipe-page-client/recipe-page-client";
import { TagData } from "@/types/interfaces";

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

  // retrieve the recipe details first as other data depends on it
  const recipeDetails = await getRecipeDetail(recipeId);
  if (!recipeDetails) return null;

  // retrieve the user id
  const userId =
    typeof recipeDetails.user_id === "string"
      ? Number(recipeDetails.user_id)
      : recipeDetails.user_id;

  // fetch user and season tags in parallel using Promise.allSettled
  const [userResult, seasonDataResult] = await Promise.allSettled([
    getUser(userId),
    getRecipeTags(recipeDetails.id),
  ]);

  // Check user result
  if (userResult.status === "rejected" || !userResult.value) return null;
  const user = userResult.value;

  // Check season data result and process tags
  const seasonData =
    seasonDataResult.status === "fulfilled" ? seasonDataResult.value : [];

  // format the season tags
  const seasonTags = recipeDetails.season
    .map((tagId: number) => {
      const tag = seasonData.find((t: TagData) => t.id === tagId);
      return tag ? tag.name : "";
    })
    .filter(Boolean)
    .join(", ");

  // format the season tags array
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
