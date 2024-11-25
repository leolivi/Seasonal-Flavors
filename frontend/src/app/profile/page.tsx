"use client"; // Marking this component as a Client Component

import { useSession } from "next-auth/react"; // Use the client-side session hook
import { useEffect, useState } from "react";
import ProfileCard from "@/components/profile-card/profile-card";
import {
  AuthSession,
  SessionLoader,
} from "@/components/auth-session/auth-session";
import { Button, ButtonSize, ButtonStyle } from "@/components/button/button";
import { dataFetchWithToken } from "@/utils/data-fetch";

interface UserData {
  id: number;
  username: string;
  email: string;
}

async function fetchUserProfile(accessToken: string) {
  // Fetch user profile
  const profile = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    accessToken,
  );

  // Fetch user images
  const images = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/images?user_id=${profile.id}&recipe_id=null`,
    accessToken,
  );

  return {
    profile,
    userImage:
      images && images.length > 0
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${images.file_path}`
        : null,
  };
}

const Profile = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (status === "authenticated") {
        const { profile, userImage } = await fetchUserProfile(
          session.accessToken,
        );
        setUserData(profile);
        setUserImage(userImage);
      }
    };

    loadUserProfile();
  }, [status, session?.accessToken]);

  // If session is loading or user data is not available, show loading state
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
    </div>
  );
};

export default Profile;
