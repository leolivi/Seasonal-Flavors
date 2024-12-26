import { dataFetch } from "@/lib/data-fetch";

export interface Recipe {
  id: number;
  title: string;
  prep_time: number;
}

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
