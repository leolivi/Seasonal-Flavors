import { dataFetch } from "@/lib/data-fetch";

export const getRecipeDetail = async (recipeId: number) => {
  try {
    const [recipeResponse, recipeTags, imageData] = await Promise.all([
      dataFetch(`${process.env.BACKEND_URL}/api/recipe?id=${recipeId}`),
      dataFetch(`${process.env.BACKEND_URL}/api/recipes/${recipeId}/tags`),
      dataFetch(`${process.env.BACKEND_URL}/api/images?recipe_id=${recipeId}`),
    ]);

    if (!recipeResponse || recipeResponse.length === 0) {
      throw new Error("Rezept nicht gefunden");
    }

    const firstImage = imageData[0] || {};
    const recipe = Array.isArray(recipeResponse)
      ? recipeResponse[0]
      : recipeResponse;

    return {
      ...recipe,
      season: recipeTags.map((tag: { id: number }) => tag.id),
      imageSrc: firstImage.file_path || "",
      imageAlt: firstImage.alt_text || recipe.title,
    };
  } catch (error) {
    console.error("Fehler beim Laden des Rezepts:", error);
    return null;
  }
};
