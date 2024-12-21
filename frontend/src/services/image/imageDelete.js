export const handleImageDelete = async (recipeId, imageId, toast) => {
  console.log("handleImageDelete started with:", {
    recipeId,
    imageId,
  });

  try {
    const response = await fetch(
      `/api/delete-image/${imageId}?recipe_id=${recipeId}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: data.message || "Bild konnte nicht gelöscht werden.",
      });
      throw new Error(data.message || "Image deletion failed");
    }

    toast({
      title: "Erfolg",
      description: "Bild wurde erfolgreich gelöscht.",
    });

    return data;
  } catch (error) {
    console.error("Bild-Löschung fehlgeschlagen:", error);
    return null;
  }
};
