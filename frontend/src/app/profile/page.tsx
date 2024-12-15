"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile-card/profile-card";
import {
  AuthSession,
  SessionLoader,
} from "@/components/auth-session/auth-session";
import { Button, ButtonSize, ButtonStyle } from "@/components/button/button";
import { dataFetchWithToken } from "@/lib/data-fetch";

interface UserData {
  id: number;
  username: string;
  email: string;
  imageSrc?: string;
}

async function fetchUserProfile(accessToken: string): Promise<UserData> {
  // Fetch user profile
  const profile = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    accessToken,
  );

  // Fetch user image data for type=profile
  const imageData = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images?user_id=${profile.id}&type=profile`,
    accessToken,
  );

  const userImage = imageData[0] || {};

  return {
    ...profile,
    imageSrc: userImage.file_path
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userImage.file_path}`
      : "",
  };
}

const Profile = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (status === "authenticated" && session?.accessToken) {
        try {
          const profileData = await fetchUserProfile(session.accessToken);
          setUserData(profileData);
        } catch (error) {
          console.error("Error loading user profile:", error);
        }
      }
    };

    loadUserProfile();
  }, [status, session?.accessToken]);

  if (status === "loading" || !userData) {
    return <SessionLoader />;
  }

  return (
    <div className="flex justify-center px-4 pb-8 min-[640px]:px-8">
      <h1 className="sr-only">Dashboard</h1>
      <AuthSession>
        <div className="flex flex-col items-center">
          <ProfileCard
            name={userData.username}
            email={userData.email}
            src={userData.imageSrc || ""}
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
    </div>
  );
};

export default Profile;
