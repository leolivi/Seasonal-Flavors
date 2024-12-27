export const deleteFavoriteRecipe = async ({ recipeId, toast }) => {
  if (!recipeId) {
    console.error("Keine Rezept-ID angegeben");
    return false;
  }

  try {
    const response = await fetch(`/api/auth/delete-favorite/${recipeId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: data.message || "Favorit konnte nicht gelöscht werden.",
      });
      throw new Error(data.message || "Favorite deletion failed");
    }

    toast({
      variant: "default",
      title: "Erfolg",
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
