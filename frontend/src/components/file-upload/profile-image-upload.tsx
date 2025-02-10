import { useState } from "react";
import { Button } from "../button/button";
import { ButtonSize, ButtonStyle } from "@/utils/enum";
import { useToast } from "@/hooks/use-toast";
import { ImageData, UserData } from "@/types/interfaces";
import { handleImageUpdate } from "@/utils/image-handler";
import { Typography } from "../ui/typography";
import { profileSchema } from "@/validation/profileSchema";

interface ProfileImageUploadProps {
  userId: string;
  currentImage: ImageData | undefined;
  username: string;
  onImageUpdate: (newImageData: ImageData | undefined) => void;
  onUserDataUpdate: (userData: UserData) => void;
}

/*
  @desc Profile image upload component
*/
export function ProfileImageUpload({
  userId,
  currentImage,
  username,
  onImageUpdate,
  onUserDataUpdate,
}: ProfileImageUploadProps) {
  const [inputKey, setInputKey] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // @desc Handle image upload change
  const handleImageUploadChange = async (file: File | null) => {
    if (file) {
      // Validate using the existing schema
      const result = profileSchema.shape.profile_image.safeParse(file);
      if (!result.success) {
        setError(result.error.errors[0].message);
        setInputKey(Date.now());
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Dein Profilbild konnte nicht aktualisiert werden.",
        });
        return;
      }
      setError(null);

      const imageUpdateSuccess = await handleImageUpdate({
        entityId: Number(userId),
        currentImage: currentImage,
        newImage: file,
        entityName: username,
        type: "profile",
        toast,
        onSuccess: (newImageData) => {
          onImageUpdate(newImageData);
          setInputKey(Date.now());
        },
        onDataUpdate: (userData) => {
          onUserDataUpdate(userData);
        },
      });

      if (!imageUpdateSuccess) {
        setInputKey(Date.now());
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <input
          key={inputKey}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleImageUploadChange(file);
          }}
          className="hidden"
          id="profile-image-upload"
        />
        <Button
          type="button"
          aria-label="Profilbild hochladen"
          label="Profilbild hochladen"
          size={ButtonSize.XS}
          style={ButtonStyle.UPLOAD}
          onClick={() =>
            document.getElementById("profile-image-upload")?.click()
          }
        />
      </div>
      {error && (
        <Typography variant="xxs" className="text-sfred">
          {error}
        </Typography>
      )}
    </div>
  );
}
