export const handleImageDelete = async (entityId, imageId, toast) => {
  if (!entityId || !imageId) {
    console.error("Invalid parameters for handleImageDelete:", {
      entityId,
      imageId,
    });
    return false;
  }

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
        description: data.message || "Profilbild konnte nicht gelöscht werden.",
      });
      return false;
    }

    // Fix this reload state issue
    window.location.reload();
    toast({
      variant: "default",
      title: "Erfolg",
      description: "Profilbild wurde erfolgreich gelöscht.",
    });
    return true;
  } catch (error) {
    console.error("Profilbild-Löschung fehlgeschlagen:", error);
    return false;
  }
};
