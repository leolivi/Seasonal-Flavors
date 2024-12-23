import { dataFetch } from "@/lib/data-fetch";

export interface ImageData {
  id: number;
  file_path: string;
  alt_text: string;
}

export const getCurrentImage = async (
  recipeId: number,
): Promise<ImageData | undefined> => {
  try {
    const response = await dataFetch(
      `${process.env.BACKEND_URL}/api/images?type=recipe&recipe_id=${recipeId}`,
    );

    if (Array.isArray(response) && response.length > 0) {
      return response[0];
    }

    return undefined;
  } catch (error) {
    console.error("Fehler beim Laden des Bildes:", error);
    return undefined;
  }
};
