import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSize,
} from "../avatar/avatar";
import { FiTrash2 } from "react-icons/fi";
import { CloseButton } from "../ui/close-button";
import {
  FileInput,
  FileUploadClearTrigger,
  FileUploadRoot,
} from "@/components/file-upload/file-upload";
import { InputGroup } from "@/components/ui/input-group";
import { LuFileUp } from "react-icons/lu";
import { Typography } from "../ui/typography";

interface AvatarUploadProps {
  avatarSrc: string;
  avatarFallback: string;
}

export default function AvatarUpload({
  avatarSrc,
  avatarFallback,
}: AvatarUploadProps) {
  return (
    <div className="flex flex-col items-center">
      <Avatar size={AvatarSize.large}>
        <AvatarImage src={avatarSrc} alt={avatarFallback} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="relative -right-10 -top-20 w-fit cursor-pointer rounded-full bg-sfwhite-light p-1 hover:drop-shadow-lg">
        <FiTrash2 size={25} />
      </div>
      <FileUploadRoot
        gap="1"
        maxWidth="300px"
        accept={[
          "image/png, image/jpg, image/JPG, image/jpeg, image/svg, image/webp",
        ]}
        className="flex flex-col items-center"
      >
        <Typography
          variant="small"
          className="font-figtreeRegular text-sfblack"
        >
          <InputGroup
            w="full"
            startElement={<LuFileUp />}
            endElement={
              <FileUploadClearTrigger asChild>
                <CloseButton
                  me="-1"
                  size="xs"
                  variant="plain"
                  focusVisibleRing="inside"
                  focusRingWidth="2px"
                  pointerEvents="auto"
                  color="fg.subtle"
                />
              </FileUploadClearTrigger>
            }
          >
            <FileInput />
          </InputGroup>
        </Typography>
      </FileUploadRoot>
    </div>
  );
}
