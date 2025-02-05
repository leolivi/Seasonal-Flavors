"use client";

import { Typography } from "../ui/typography";
import AvatarUpload from "../file-upload/avatar-upload";
import ProfileForm from "../forms/profile-form";
import { AuthSession, SessionLoader } from "../auth-session/auth-session";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { getCurrentUser, UserData } from "@/services/user/userService";
import { ImageData, getProfileImage } from "@/services/image/imageService";
import { handleUserDelete } from "@/services/user/userDelete";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export interface ProfileCardProps {
  userData: UserData | null;
}

export default function ProfileCard({
  userData: initialUserData,
}: ProfileCardProps) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const [userData, setUserData] = useState<UserData | null>(initialUserData);

  useEffect(() => {
    setUserData(initialUserData);
  }, [initialUserData]);

  useEffect(() => {
    const fetchImage = async () => {
      if (userData?.id) {
        const fetchedImageData = await getProfileImage(userData.id);
        setImageData(fetchedImageData);
      }
    };

    const fetchUserData = async () => {
      if (session?.accessToken) {
        const fetchedUserData = await getCurrentUser(session.accessToken);
        setUserData(fetchedUserData);
      }
    };

    fetchImage();
    fetchUserData();
  }, [session]);

  const handleImageUpdate = (newImageData: ImageData | undefined) => {
    setImageData(newImageData);
  };

  const handleUserUpdate = (newUserData: UserData) => {
    setUserData(newUserData);
  };

  if (!userData) {
    return <SessionLoader />;
  }

  return (
    <AuthSession>
      <div>
        <div className="flex flex-col items-center px-4 pb-8 min-[640px]:px-8">
          <Typography variant="heading2" className="py-8 font-figtreeRegular">
            <h1 aria-label="mein Profil" tabIndex={0}>
              mein Profil
            </h1>
          </Typography>
          <div className="flex flex-col items-center gap-6">
            <AvatarUpload
              avatarSrc={imageData?.file_path || ""}
              avatarFallback="User's avatar"
              userId={userData.id}
              imageId={imageData?.id}
              onImageUpdate={handleImageUpdate}
            />
            <div className="w-full min-[640px]:w-[500px]">
              <ProfileForm
                user={userData}
                image={imageData}
                onImageUpdate={handleImageUpdate}
                onUserUpdate={handleUserUpdate}
                setUserData={setUserData}
              />
            </div>
          </div>
        </div>
        <div className="mb-8 flex w-full justify-center">
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
