import { getRecipeImage } from "@/services/image/imageService";
import { getRecipe } from "@/services/recipe/recipeService";
import { getRecipeTags } from "@/services/tag/tagService";

/*
  @desc Get recipe detail
*/
export const getRecipeDetail = async (recipeId: number) => {
  // get recipe, image and tags
  try {
    const [recipe, imageData, recipeTags] = await Promise.all([
      getRecipe(recipeId),
      getRecipeImage(recipeId),
      getRecipeTags(recipeId),
    ]);

    // if recipe not found, throw error
    if (!recipe) {
      throw new Error("Rezept nicht gefunden");
    }

    return {
      ...recipe,
      season: recipeTags.map((tag) => tag.id),
      imageSrc: imageData?.file_path || "",
      imageAlt: imageData?.alt_text || recipe.title,
    };
  } catch (error) {
    console.error("Fehler beim Laden des Rezepts:", error);
    return null;
  }
};
