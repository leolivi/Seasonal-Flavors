import { getRecipeDetail } from "@/utils/recipeDetail";
import { getRecipeTags, TagData } from "@/services/tag/tagService";
import { getUser } from "@/services/user/userService";
import { RecipePageClient } from "@/components/recipe-page-client/recipe-page-client";

export default async function RecipePage({
  params,
}: {
  params: { id: number };
}) {
  const recipeId = params.id;
  const recipeDetails = await getRecipeDetail(recipeId);

  if (!recipeDetails) return null;

  const userId =
    typeof recipeDetails.user_id === "string"
      ? Number(recipeDetails.user_id)
      : recipeDetails.user_id;

  const user = await getUser(userId);
  if (!user) return null;

  const seasonData = await getRecipeTags(recipeDetails.id);

  const seasonTags = recipeDetails.season
    .map((tagId: number) => {
      const tag = seasonData.find((t: TagData) => t.id === tagId);
      return tag ? tag.name : "";
    })
    .filter(Boolean)
    .join(", ");

  const seasonArray = seasonTags
    .split(",")
    .map((season: string) => season.trim());

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
