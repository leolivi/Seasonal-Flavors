"use client";

import { Button, ButtonSize, ButtonStyle } from "@/components/button/button";
import ProfileCard from "@/components/profile-card/profile-card";
import {
  AuthSession,
  SessionLoader,
} from "@/components/auth-session/auth-session";
import { useSession } from "next-auth/react";

import { Suspense, useEffect, useState } from "react";
import { dataFetchWithToken } from "@/utils/data-fetch";
import Image from "next/image";

interface UserData {
  id: number;
  username: string;
  email: string;
}

interface RecipeData {
  id: number;
}

const Profile = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserProfile() {
      if (status === "authenticated") {
        try {
          const profile = await dataFetchWithToken(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
            session.accessToken,
          );

          if (profile) {
            setUserData(profile);

            console.log("Access Token:", session.accessToken);

            // Fetch user image
            const images = await dataFetchWithToken(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/images?user_id=${profile.id}&recipe_id=null`,
              session.accessToken,
            );

            console.log("Images response:", images);

            // if (images && images.length > 0) {
            //   const fullImagePath = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${images[0].file_path}`;
            //   setUserImage(fullImagePath);
            // } else {
            //   setUserImage(null);
            // }
            setUserImage(null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    }
    fetchUserProfile();
  }, [status, session?.accessToken]);

  // If userData is not yet loaded, show a loading state
  if (!userData) {
    return <SessionLoader />;
  }

  return (
    <div className="flex justify-center px-4 pb-8 min-[640px]:px-8">
      <h1 className="sr-only">Dashboard</h1>
      <Suspense fallback={<SessionLoader />}>
        <AuthSession>
          <div className="flex flex-col items-center">
            {/* TODO: Add src here */}
            <ProfileCard
              name={userData.username}
              email={userData.email}
              src={userImage || ""}
            />
            <div className="flex w-full justify-center">
              <Button
                style={ButtonStyle.SIMPLERED}
                label="Profil löschen"
                size={ButtonSize.XS}
              />
            </div>
          </div>
        </AuthSession>
      </Suspense>
    </div>
  );
};

export default Profile;
