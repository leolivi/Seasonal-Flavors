export const handleImageDelete = async (recipeId, imageId, toast) => {
  console.log("handleImageDelete started with:", {
    recipeId,
    imageId,
  });
  if (!recipeId || !imageId) {
    console.error("Invalid parameters for handleImageDelete:", {
      recipeId,
      imageId,
    });
    return null;
  }

  try {
    const response = await fetch(`/api/auth/delete-image/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_id: recipeId,
      }),
    });

    console.log(
      "Image deletion request body:",
      JSON.stringify({ recipe_id: recipeId }),
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

    return true;
  } catch (error) {
    console.error("Bild-Löschung fehlgeschlagen:", error);
    return null;
  }
};
