/*
  @desc Get recipe image
*/
export const getRecipeImage = async (recipeId: number) => {
  // redirect to api handler get-image
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

    return data;
  } catch (error) {
    console.error("Fehler beim Laden des Rezeptbildes:", error);
    return undefined;
  }
};

/*
  @desc Get profile image
*/
export const getProfileImage = async (userId: number) => {
  // redirect to api handler get-image
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-image?type=profile&user_id=${userId}`,
    );

    if (response.status === 401) {
      return undefined;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden des Profilbildes");
    }

    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }

    return data;
  } catch (error) {
    console.error("Fehler beim Laden des Profilbildes:", error);
    return undefined;
  }
};
