import { getRecipe } from "@/services/recipe/recipeService";
import { getRecipeTags } from "@/services/tag/tagService";
import { getRecipeImage } from "@/services/image/imageService";

export const getRecipeDetail = async (recipeId: number) => {
  try {
    const [recipe, imageData, recipeTags] = await Promise.all([
      getRecipe(recipeId),
      getRecipeImage(recipeId),
      getRecipeTags(recipeId),
    ]);

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
