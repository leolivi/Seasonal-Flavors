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
    const params = new URLSearchParams();
    params.append("tags[]", "all_year");
    params.append("tags[]", seasonName);
    params.append("limit", "10");

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipe?${params.toString()}`,
      { cache: "no-store" },
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
      { cache: "no-store" },
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
      { cache: "no-store" },
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

export const getFilteredRecipes = async (season: string, title?: string) => {
  try {
    const params = new URLSearchParams();

    if (season && season !== "all_year") {
      params.append("tags[]", season);
    } else {
      params.append("tags[]", "all_year");
    }

    if (title) {
      params.append("title", encodeURIComponent(title));
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipe?${params.toString()}`,
      { cache: "no-store" },
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden der Rezepte");
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fehler beim Laden der Rezepte:", error);
    return [];
  }
};
