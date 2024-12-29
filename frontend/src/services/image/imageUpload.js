export const handleImageUpload = async (
  id,
  image,
  title,
  toast,
  type = "recipe",
) => {
  if (!image) return null;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("type", type);

  if (type === "recipe") {
    formData.append("recipe_id", id);
    formData.append("alt_text", `Titelbild Rezept ${title}`);
  } else if (type === "profile") {
    formData.append("user_id", id);
    formData.append("alt_text", `Profilbild ${title}`);
  }

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
