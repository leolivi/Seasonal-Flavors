import { handleImageDelete } from "@/services/image/imageDelete";
import { getProfileImage, getRecipeImage } from "@/services/image/imageService";
import { handleImageUpload } from "@/services/image/imageUpload";
import { ImageData } from "@/types/interfaces";

interface ImageHandlerParams {
  entityId: number;
  currentImage: ImageData | undefined;
  newImage: File;
  entityName: string;
  type?: "profile" | "recipe";
  toast: any;
  onSuccess?: (updatedImageData: ImageData | undefined) => void;
  onDataUpdate?: (data: any) => void;
}

/*
  @desc handle image update
*/
export async function handleImageUpdate({
  entityId,
  currentImage,
  newImage,
  entityName,
  type = "recipe",
  toast,
  onSuccess,
  onDataUpdate,
}: ImageHandlerParams) {
  try {
    let uploadResult: string | undefined;

    // delete the old image, if it exists
    if (currentImage && currentImage.id) {
      const deleteResult = await handleImageDelete(
        entityId,
        currentImage.id,
        toast,
      );
      if (!deleteResult) {
        throw new Error("Fehler beim Löschen des alten Bildes");
      }
    }

    // upload the new image
    uploadResult = await handleImageUpload(
      entityId,
      newImage,
      entityName,
      toast,
      type,
    );

    if (!uploadResult) {
      throw new Error("Fehler beim Hochladen des neuen Bildes");
    }

    // get the updated image
    const updatedImageData =
      type === "profile"
        ? await getProfileImage(entityId)
        : await getRecipeImage(entityId);

    if (onSuccess) onSuccess(updatedImageData);
    if (onDataUpdate) onDataUpdate({ ...currentImage });

    // trigger the profile image update event
    if (type === "profile") {
      window.dispatchEvent(new Event("profileImageUpdate"));
    }

    return true;
  } catch (error) {
    // handle the error
    console.error("Fehler bei der Bildverarbeitung:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description: "Bild konnte nicht aktualisiert werden.",
    });
    return false;
  }
}
