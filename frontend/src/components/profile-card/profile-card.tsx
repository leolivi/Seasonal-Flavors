"use client";

import { AuthSession, SessionLoader } from "../auth-session/auth-session";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { getCurrentUser, UserData } from "@/services/user/userService";
import { handleUserDelete } from "@/services/user/userDelete";
import { ImageData, getProfileImage } from "@/services/image/imageService";
import { ToastAction } from "@radix-ui/react-toast";
import { Typography } from "../ui/typography";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import AvatarUpload from "../file-upload/avatar-upload";
import ProfileForm from "../forms/profile-form";

export interface ProfileCardProps {
  userData: UserData | null;
}

/*
  @desc Profile card
*/
export default function ProfileCard({
  userData: initialUserData,
}: ProfileCardProps) {
  // get the toast
  const { toast } = useToast();
  // get the session
  const { data: session, status } = useSession();
  // get the image data
  const [imageData, setImageData] = useState<ImageData | undefined>();
  // get the user data
  const [userData, setUserData] = useState<UserData | null>(initialUserData);

  // set the user data
  useEffect(() => {
    setUserData(initialUserData);
  }, [initialUserData]);

  // fetch the image data and user data
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // handle the image update
  const handleImageUpdate = (newImageData: ImageData | undefined) => {
    setImageData(newImageData);
  };

  // handle the user update
  const handleUserUpdate = (newUserData: UserData) => {
    setUserData(newUserData);
  };

  // render the session loader if the session is loading or the loading state is true
  if (!userData || status === "loading") {
    return (
      <div className="flex h-[45vh] w-full flex-col items-center justify-center">
        <SessionLoader />
      </div>
    );
  }

  // render the component
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
            {/* avatar upload */}
            <AvatarUpload
              avatarSrc={imageData?.file_path || ""}
              avatarFallback="User's avatar"
              userId={userData.id}
              imageId={imageData?.id}
              onImageUpdate={handleImageUpdate}
            />
            <div className="w-full min-[640px]:w-[500px]">
              {/* profile form */}
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
        {/* delete button */}
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
