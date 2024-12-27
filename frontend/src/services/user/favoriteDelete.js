export const deleteFavoriteRecipe = async ({ recipeId, toast }) => {
  try {
    const apiUrl = `/api/recipes/${recipeId}/favorite`;
    console.log("RecipeId:", recipeId);
    console.log("Vollständige URL:", window.location.origin + apiUrl);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("Server Status:", response.status);
      console.error("Response Headers:", Object.fromEntries(response.headers));
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Rezept wurde aus deinen Favoriten entfernt.",
    });

    return true;
  } catch (error) {
    console.error("Fehler beim Entfernen des Favoriten:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description: "Rezept konnte nicht aus Favoriten entfernt werden.",
    });
    return false;
  }
};
