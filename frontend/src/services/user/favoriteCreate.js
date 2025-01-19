export const handleFavoriteRecipe = async ({ recipeId, toast }) => {
  try {
    const response = await fetch("/api/create-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      console.error(
        "Fehler beim Favorisieren des Rezepts. Bitte erneut versuchen. ",
        error,
      );
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
