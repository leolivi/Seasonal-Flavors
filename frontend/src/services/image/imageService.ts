import { dataFetch, dataFetchWithToken } from "@/lib/data-fetch";

export interface ImageData {
  id: number;
  file_path: string;
  alt_text: string;
}

export const getRecipeImage = async (recipeId: number) => {
  try {
    const response = await dataFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images?recipe_id=${recipeId}&type=recipe`,
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

export const getProfileImage = async (userId: number, accessToken: string) => {
  try {
    const response = await dataFetchWithToken(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images?type=profile&user_id=${userId}`,
      accessToken,
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

export const getCurrentImage = async (recipeId: number) => {
  try {
    const response = await dataFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images?recipe_id=${recipeId}`,
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
