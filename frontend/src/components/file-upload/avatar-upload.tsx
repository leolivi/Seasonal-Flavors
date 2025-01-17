import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSize,
} from "../avatar/avatar";
import { FiTrash2 } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { handleImageDelete } from "@/services/image/imageDelete";
import { useUserImageStore } from "@/stores/userImageStore";
import { getProfileImage } from "@/services/image/imageService";
import { useSession } from "next-auth/react";

interface AvatarUploadProps {
  avatarSrc: string;
  avatarFallback: string;
  userId?: number;
  imageId?: number;
}

export default function AvatarUpload({
  avatarSrc,
  avatarFallback,
  userId,
  imageId,
}: AvatarUploadProps) {
  const seasonalColor = getSeasonColor();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toast } = useToast();
  const session = useSession();
  const { setImageUrl } = useUserImageStore();

  const handleDelete = async () => {
    if (userId && imageId) {
      const deleteImage = await handleImageDelete(userId, imageId, toast);
      if (deleteImage) {
        setImageUrl(undefined);

        const profileImage = await getProfileImage(
          userId,
          session?.data?.accessToken || "",
        );
        setImageUrl(profileImage?.file_path);
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

  return (
    <div className="flex flex-col items-center">
      <Avatar size={AvatarSize.large}>
        <AvatarImage
          src={avatarSrc}
          alt={avatarFallback}
          onLoadingStatusChange={(status) =>
            setImageLoaded(status === "loaded")
          }
        />

        <AvatarFallback>
          <FaUserCircle
            size={100}
            className={`bg-${seasonalColor}`}
            color="white"
          />
        </AvatarFallback>
      </Avatar>
      {avatarSrc !== "" && imageLoaded && (
        <div className="relative -right-10 -top-20 w-fit cursor-pointer rounded-full bg-sfwhite-light p-1 hover:drop-shadow-lg">
          <FiTrash2 size={25} onClick={handleDelete} />
        </div>
      )}
    </div>
  );
}
