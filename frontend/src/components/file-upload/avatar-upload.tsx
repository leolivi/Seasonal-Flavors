import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { handleImageDelete } from "@/services/image/imageDelete";
import { getProfileImage } from "@/services/image/imageService";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AvatarSize } from "@/utils/enum";
import { ImageData } from "@/types/interfaces";

interface AvatarUploadProps {
  avatarSrc: string;
  avatarFallback: string;
  userId?: number;
  imageId?: number;
  onImageUpdate: (newImageData: ImageData | undefined) => void;
}

/*
  @desc Displays the avatar upload
*/
export default function AvatarUpload({
  avatarSrc,
  avatarFallback,
  userId,
  imageId,
  onImageUpdate,
}: AvatarUploadProps) {
  // get the seasonal color
  const seasonalColor = getSeasonColor();
  // set the image loaded state
  const [imageLoaded, setImageLoaded] = useState(false);
  // get the toast
  const { toast } = useToast();

  // handle the image delete
  const handleDelete = async () => {
    if (userId && imageId) {
      const deleteImage = await handleImageDelete(userId, imageId, toast);
      if (deleteImage) {
        const updatedImageData = await getProfileImage(userId);
        onImageUpdate(updatedImageData);

        // dispatch the profile image update event
        window.dispatchEvent(new Event("profileImageUpdate"));

        toast({
          variant: "default",
          title: "Erfolg",
          description: "Bild wurde erfolgreich gelöscht.",
        });
      } else {
        console.error("Image deletion failed");
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Bild konnte nicht gelöscht werden.",
        });
      }
    }
  };

  // render the avatar upload
  return (
    <div className="relative flex flex-col items-center">
      <Avatar size={AvatarSize.large}>
        {/* avatar image */}
        <AvatarImage
          src={avatarSrc}
          alt={avatarFallback}
          onLoadingStatusChange={(status) =>
            setImageLoaded(status === "loaded")
          }
        />
        {/* avatar fallback */}
        <AvatarFallback>
          <FaUserCircle
            size={100}
            className={`bg-${seasonalColor}`}
            color="white"
          />
        </AvatarFallback>
      </Avatar>
      {/* delete button */}
      {avatarSrc !== "" && imageLoaded && (
        <div className="absolute -right-2 -top-1 w-fit cursor-pointer rounded-full bg-sfwhite-light p-1 hover:drop-shadow-lg">
          <FiTrash2 size={25} onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}
