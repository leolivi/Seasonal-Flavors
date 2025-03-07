/*
  @desc Handle image delete
*/
export const handleImageDelete = async (
  entityId: number,
  imageId: number,
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void,
) => {
  if (!entityId || !imageId) {
    console.error("Invalid parameters for handleImageDelete:", {
      entityId,
      imageId,
    });
    return false;
  }

  // redirect to api handler delete-image
  try {
    const response = await fetch(`/api/delete-image/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        entity_id: entityId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: data.message || "Bild konnte nicht gelöscht werden.",
      });
      return false;
    }

    return true;
  } catch (error) {
    console.error("Bild-Löschung fehlgeschlagen:", error);
    return false;
  }
};
