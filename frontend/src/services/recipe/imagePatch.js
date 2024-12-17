export const handleImagePatch = async (
  recipeId,
  imageId,
  coverImage,
  title,
  toast,
) => {
  console.log("handleImagePatch started with:", {
    recipeId,
    imageId,
    title,
    hasCoverImage: !!coverImage,
  });

  if (!coverImage) return null;

  const formData = new FormData();
  formData.append("file", coverImage);
  formData.append("type", "recipe");
  formData.append("alt_text", `Titelbild Rezept ${title}`);
  //   formData.append("recipe_id", recipeId);
  formData.append("recipe_id", String(recipeId));
  console.log("recipeId: ", recipeId);
  //   formData.append("image_id", imageId);
  formData.append("image_id", String(imageId));
  console.log("imageId: ", imageId);

  try {
    const response = await fetch(`/api/edit-image`, {
      method: "PATCH",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bild-Update fehlgeschlagen.",
      });
      throw new Error(data.message || "Image update failed");
    }

    return data;
  } catch (error) {
    console.error("Bild-Update fehlgeschlagen:", error);
    return null;
  }
};
