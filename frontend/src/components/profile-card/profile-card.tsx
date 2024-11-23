import { Typography } from "../ui/typography";
import AvatarUpload from "../file-upload/avatar-upload";
import EditableField from "../forms/editable-fields";

interface ProfileCardProps {
  name: string;
  email: string;
  password?: string;
}

export default function ProfileCard({ name, email }: ProfileCardProps) {
  const editableFields = [
    { value: name },
    { value: email },
    { value: "Password***" },
  ];

  return (
    <div className="w-full rounded px-5 py-8">
      <div className="mb-12 flex cursor-pointer items-center justify-center">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h2>mein Profil</h2>
        </Typography>
      </div>
      <div className="flex flex-col items-center gap-6">
        <AvatarUpload
          avatarSrc="https://robohash.org/81.221.206.170.png"
          avatarFallback="User's avatar"
        />
        <div className="w-5/6">
          {editableFields.map((field, index) => (
            <EditableField key={index} value={field.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
