import { Typography } from "../ui/typography";
import AvatarUpload from "../file-upload/avatar-upload";
import ProfileForm from "../forms/profile-form";

interface ProfileCardProps {
  name: string;
  email: string;
  src: string;
}

export default function ProfileCard({ name, email, src }: ProfileCardProps) {
  return (
    <div className="flex w-full flex-col items-center rounded px-5 py-8">
      <div className="mb-12 flex cursor-pointer items-center justify-center">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>mein Profil</h1>
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-6">
        <AvatarUpload avatarSrc={src} avatarFallback="User's avatar" />
        <div className="w-full">
          <ProfileForm name={name} email={email} />
        </div>
      </div>
    </div>
  );
}
