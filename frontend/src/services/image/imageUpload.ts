/*
  @desc Handle image upload
*/
export const handleImageUpload = async (
  id: string | number,
  image: File,
  title: string,
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void,
  type = "recipe",
) => {
  if (!image) return null;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("type", type);

  if (type === "recipe") {
    formData.append("recipe_id", id.toString());
    formData.append("alt_text", `Titelbild Rezept ${title}`);
  } else if (type === "profile") {
    formData.append("user_id", id.toString());
    formData.append("alt_text", `Profilbild ${title}`);
  }

  // redirect to api handler upload-image
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
