export interface ImageData {
  id: number;
  file_path: string;
  alt_text: string;
}

export const getRecipeImage = async (recipeId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-image?type=recipe&recipe_id=${recipeId}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden des Rezeptbildes");
    }

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    return undefined;
  } catch (error) {
    console.error("Fehler beim Laden des Rezeptbildes:", error);
    return undefined;
  }
};

export const getProfileImage = async (userId: number) => {
  try {
    const response = await fetch(
      `/api/get-image?type=profile&user_id=${userId}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden des Profilbildes");
    }

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    return undefined;
  } catch (error) {
    console.error("Fehler beim Laden des Profilbildes:", error);
    return undefined;
  }
};
