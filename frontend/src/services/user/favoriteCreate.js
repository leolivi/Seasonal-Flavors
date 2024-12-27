import { deleteFavoriteRecipe } from "./favoriteDelete";

export const handleFavoriteRecipe = async ({
  recipeId,
  accessToken,
  toast,
  isFavorited,
}) => {
  if (isFavorited) {
    return await deleteFavoriteRecipe({ recipeId, accessToken, toast });
  }

  try {
    const response = await fetch("/api/create-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ recipeId }),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Rezept konnte nicht favorisiert werden.",
      });
      const error = await response.json();
      console.error("Fehler beim Favorisieren des Rezepts:", error);
      return false;
    }

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Rezept wurde zu deinen Favoriten hinzugefügt.",
    });

    return true;
  } catch (error) {
    console.error("Fehler beim Favorisieren des Rezepts:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description:
        "Rezept konnte nicht favorisiert werden. Bitte erneut versuchen.",
    });
    return false;
  }
};
