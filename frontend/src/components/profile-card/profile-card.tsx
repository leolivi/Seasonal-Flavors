"use client";

import { Typography } from "../ui/typography";
import AvatarUpload from "../file-upload/avatar-upload";
import ProfileForm from "../forms/profile-form";
import { AuthSession, SessionLoader } from "../auth-session/auth-session";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { UserData } from "@/services/user/userService";
import type { ImageData } from "@/services/image/imageService";

export interface ProfileCardProps {
  userData: UserData | null;
  imageData: ImageData | undefined;
}

export default function ProfileCard({ userData, imageData }: ProfileCardProps) {
  if (!userData) {
    return <SessionLoader />;
  }

  return (
    <AuthSession>
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center rounded px-5 py-8">
          <div className="mb-12 flex cursor-pointer items-center justify-center">
            <Typography variant="heading2" className="font-figtreeRegular">
              <h1>mein Profil</h1>
            </Typography>
          </div>
          <div className="flex flex-col items-center gap-6">
            <AvatarUpload
              avatarSrc={userData.imageSrc || ""}
              avatarFallback="User's avatar"
            />
            <div className="w-full">
              <ProfileForm user={userData} image={imageData} />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          {/* TODO: Add profile deletion */}
          <Button
            style={ButtonStyle.SIMPLERED}
            label="Profil löschen"
            size={ButtonSize.XS}
          />
        </div>
      </div>
    </AuthSession>
  );
}
