"use client";

import { Typography } from "../ui/typography";
import AvatarUpload from "../file-upload/avatar-upload";
import ProfileForm from "../forms/profile-form";
import { AuthSession, SessionLoader } from "../auth-session/auth-session";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { UserData } from "@/services/user/userService";
import { ImageData, getProfileImage } from "@/services/image/imageService";
import { handleUserDelete } from "@/services/user/userDelete";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

export interface ProfileCardProps {
  userData: UserData | null;
}

export default function ProfileCard({ userData }: ProfileCardProps) {
  const { toast } = useToast();
  const [imageData, setImageData] = useState<ImageData | undefined>();

  useEffect(() => {
    const fetchImage = async () => {
      if (userData?.id) {
        const fetchedImageData = await getProfileImage(userData.id);
        setImageData(fetchedImageData);
      }
    };

    fetchImage();
  }, [userData?.id]);

  const handleImageUpdate = (newImageData: ImageData | undefined) => {
    setImageData(newImageData);
  };

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
              avatarSrc={imageData?.file_path || ""}
              avatarFallback="User's avatar"
              userId={userData.id}
              imageId={imageData?.id}
              onImageUpdate={handleImageUpdate}
            />
            <div className="w-full">
              <ProfileForm
                user={userData}
                image={imageData}
                onImageUpdate={handleImageUpdate}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button
            style={ButtonStyle.SIMPLERED}
            label="Profil löschen"
            size={ButtonSize.XS}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast({
                variant: "destructive",
                title: "Profil löschen",
                description: "Möchtest du dein Profil wirklich löschen?",
                action: (
                  <ToastAction
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUserDelete(userData.id, toast);
                    }}
                    altText="Profil löschen bestätigen"
                  >
                    Löschen
                  </ToastAction>
                ),
              });
            }}
          />
        </div>
      </div>
    </AuthSession>
  );
}
