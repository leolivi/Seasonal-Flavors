import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSize,
} from "../avatar/avatar";
import { FiTrash2 } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { getSeasonColor } from "@/utils/SeasonUtils";

interface AvatarUploadProps {
  avatarSrc: string;
  avatarFallback: string;
}

export default function AvatarUpload({
  avatarSrc,
  avatarFallback,
}: AvatarUploadProps) {
  const seasonalColor = getSeasonColor();

  return (
    <div className="flex flex-col items-center">
      <Avatar size={AvatarSize.large}>
        <AvatarImage src={avatarSrc} alt={avatarFallback} />

        <AvatarFallback>
          <FaUserCircle
            size={100}
            className={`bg-${seasonalColor}`}
            color="white"
          />
        </AvatarFallback>
      </Avatar>
      {avatarSrc && (
        <div className="relative -right-10 -top-20 w-fit cursor-pointer rounded-full bg-sfwhite-light p-1 hover:drop-shadow-lg">
          <FiTrash2 size={25} />
        </div>
      )}
    </div>
  );
}
