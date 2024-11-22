import { getSeasonColor } from "@/utils/SeasonUtils";
import { Typography } from "../ui/typography";
import { FaPen } from "react-icons/fa";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSize,
} from "../avatar/avatar";

interface ProfileCardProps {
  name: string;
  email: string;
  password?: string;
}

export default function ProfileCard({ name, email }: ProfileCardProps) {
  const seasonalColor = getSeasonColor();

  return (
    <div
      className={`w-full rounded bg-${seasonalColor}-light px-5 py-8 shadow-lg hover:drop-shadow-lg`}
    >
      <div className="mb-12 flex cursor-pointer items-center justify-between">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h2>mein Profil</h2>
        </Typography>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sfwhite"
          // onClick={openModalClick}
        >
          <FaPen size={20} />
        </div>
      </div>
      <div className="flex gap-6">
        <Avatar size={AvatarSize.large}>
          <AvatarImage
            src="https://robohash.org/81.221.206.170.png"
            alt="User's avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <Typography variant="body">
            <p className="font-figtreeRegular">{name}</p>
            <p className="font-figtreeRegular">{email}</p>
            <p className="font-figtreeRegular">Passwort ***</p>
          </Typography>
        </div>
      </div>
    </div>
  );
}
