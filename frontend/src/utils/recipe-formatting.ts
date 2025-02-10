import { Recipe } from "@/services/recipe/recipeService";
import { getRecipeImage } from "@/services/image/imageService";
import { getRecipeTags } from "@/services/tag/tagService";

/*
  @desc Format recipe data by fetching and combining image and season tag information
*/
export const formatRecipeData = async (recipes: Recipe[]) => {
  return Promise.all(
    recipes.map(async (recipe) => {
      // Fetch image and season data in parallel for each recipe
      const [imageResult, seasonResult] = await Promise.allSettled([
        getRecipeImage(recipe.id),
        getRecipeTags(recipe.id),
      ]);

      // Handle image data
      const imageData =
        imageResult.status === "fulfilled" ? imageResult.value : null;

      // Handle season data
      const seasonData =
        seasonResult.status === "fulfilled" ? seasonResult.value : [];

      // Format season tags
      const seasonTags = Array.isArray(seasonData)
        ? seasonData.map((tag) => tag.name).join(", ")
        : "";

      // Return formatted recipe
      return {
        ...recipe,
        imageSrc: imageData?.file_path || null,
        imageAlt: imageData?.alt_text || recipe.title || "",
        season: seasonTags,
      };
    }),
  );
};
