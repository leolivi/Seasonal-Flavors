import { dataFetch } from "@/lib/data-fetch";
import { getCurrentSeason } from "@/utils/SeasonUtils";

export interface Recipe {
  id: number;
  title: string;
  cooking_time: number;
  prep_time: number;
  servings: number;
  steps: string;
  ingredients: string;
  user_id: string;
  image_id?: number;
  imageSrc?: string;
  imageAlt?: string;
  season?: string | number[];
}

export const getSeasonalRecipes = async () => {
  const seasonName = getCurrentSeason();

  try {
    const recipes: Recipe[] = await dataFetch(
      `${process.env.BACKEND_URL}/api/recipe?tags[]=all_year&tags[]=${seasonName}&limit=10`,
    );
    return recipes;
  } catch (error) {
    console.error("Fehler beim Laden der Rezepte:", error);
    return [];
  }
};

export const getRecipe = async (recipeId: number): Promise<Recipe | null> => {
  try {
    const recipeResponse = await dataFetch(
      `${process.env.BACKEND_URL}/api/recipe?id=${recipeId}`,
    );

    if (!recipeResponse || recipeResponse.length === 0) {
      return null;
    }

    return Array.isArray(recipeResponse) ? recipeResponse[0] : recipeResponse;
  } catch (error) {
    console.error("Fehler beim Laden des Rezepts:", error);
    return null;
  }
};

export const getUserRecipes = async (
  userId: number,
): Promise<Recipe[] | null> => {
  try {
    const recipes = await dataFetch(
      `${process.env.BACKEND_URL}/api/recipe?user_id=${userId}`,
    );

    if (!Array.isArray(recipes)) {
      console.error("Erwartetes Array von Rezepten nicht erhalten:", recipes);
      return null;
    }

    return recipes;
  } catch (error) {
    console.error("Fehler beim Laden der Benutzer-Rezepte:", error);
    return null;
  }
};

export const getFilteredRecipes = async (
  seasonName: string,
  title?: string,
): Promise<Recipe[] | null> => {
  try {
    const recipes = await dataFetch(
      `${process.env.BACKEND_URL}/api/recipe?tags[]=all_year&tags[]=${seasonName}${
        title ? `&title=${encodeURIComponent(title)}` : ""
      }`,
    );

    if (!Array.isArray(recipes)) {
      console.error("Erwartetes Array von Rezepten nicht erhalten:", recipes);
      return null;
    }

    return recipes;
  } catch (error) {
    console.error("Fehler beim Laden der gefilterten Rezepte:", error);
    return null;
  }
};
