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
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipe?season=${seasonName}&limit=10`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Fehler beim Laden der saisonalen Rezepte",
      );
    }

    return data;
  } catch (error) {
    console.error("Fehler beim Laden der Rezepte:", error);
    return [];
  }
};

export const getRecipe = async (recipeId: number): Promise<Recipe | null> => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipe?id=${recipeId}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden des Rezepts");
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Fehler beim Laden des Rezepts:", error);
    return null;
  }
};

export const getUserRecipes = async (
  userId: number,
): Promise<Recipe[] | null> => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipe?user_id=${userId}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden der Benutzer-Rezepte");
    }

    if (!Array.isArray(data)) {
      console.error("Erwartetes Array von Rezepten nicht erhalten:", data);
      return null;
    }

    return data;
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
    const url = `${process.env.BACKEND_URL}/api/recipe?season=${seasonName}${
      title ? `&title=${encodeURIComponent(title)}` : ""
    }`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Fehler beim Laden der gefilterten Rezepte",
      );
    }

    if (!Array.isArray(data)) {
      console.error("Erwartetes Array von Rezepten nicht erhalten:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Fehler beim Laden der gefilterten Rezepte:", error);
    return null;
  }
};
