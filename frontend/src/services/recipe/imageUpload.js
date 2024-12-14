export const handleImageUpload = async (recipeId, coverImage, title, toast) => {
  if (!coverImage) return null;

  const formData = new FormData();
  formData.append("file", coverImage);
  formData.append("type", "recipe");
  formData.append("alt_text", `Titelbild Rezept ${title}`);
  formData.append("recipe_id", recipeId);

  try {
    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bild-Upload fehlgeschlagen.",
      });
      throw new Error(data.message || "Image upload failed");
    }
    return data;
  } catch (error) {
    console.error("Bild-Upload fehlgeschlagen:", error);
    return null;
  }
};
