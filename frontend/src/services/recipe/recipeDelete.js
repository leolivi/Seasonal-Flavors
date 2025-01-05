export const handleRecipeDelete = async (recipeId, toast, router) => {
  if (!recipeId) {
    console.error("Keine Rezept-ID angegeben");
    return false;
  }

  try {
    const response = await fetch(`/api/delete-recipe/${recipeId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Rezept konnte nicht gelöscht werden.",
      });
      throw new Error(data.message || "Recipe deletion failed");
    }

    toast({
      variant: "default",
      title: "Erfolg",
      description: "Rezept wurde erfolgreich gelöscht.",
    });

    router.push("/my-recipes");
    router.refresh();
    return true;
  } catch (error) {
    console.error("Rezept-Löschung fehlgeschlagen:", error);
    return false;
  }
};
