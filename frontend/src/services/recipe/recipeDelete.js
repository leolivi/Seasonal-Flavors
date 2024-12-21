import { handleImageDelete } from "../image/imageDelete";

export const handleRecipeDelete = async (recipeId, images, toast, router) => {
  console.log("handleRecipeDelete started with:", { recipeId, images });

  if (!recipeId) {
    console.error("Keine Rezept-ID angegeben");
    return false;
  }

  try {
    if (images && images.length > 0) {
      for (const image of images) {
        await handleImageDelete(recipeId, image.id, toast);
      }
    }

    const response = await fetch(`/api/auth/delete-recipe/${recipeId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: data.message || "Rezept konnte nicht gelöscht werden.",
      });
      throw new Error(data.message || "Recipe deletion failed");
    }

    toast({
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
