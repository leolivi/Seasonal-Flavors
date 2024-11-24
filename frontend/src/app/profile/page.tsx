"use client";

import { Button, ButtonSize, ButtonStyle } from "@/components/button/button";
import ProfileCard from "@/components/profile-card/profile-card";
import {
  AuthSession,
  SessionLoader,
} from "@/components/auth-session/auth-session";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Suspense, useEffect, useState } from "react";
import { dataFetchWithToken } from "@/utils/data-fetch";

interface UserData {
  id: number;
  username: string;
  email: string;
}

// interface UserImage {
//   file_path: string;
//   alt_text: string;
// }

const Profile = () => {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  // const [userImage, setUserImage] = useState<UserImage | null>(null);

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
            // const images = await dataFetch(
            //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/images?user_id=${profile.id}&recipe_id=null`,
            // );
            // if (images && images.length > 0) {
            //   setUserImage(images);
            // }
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
            <ProfileCard name={userData.username} email={userData.email} />
            <div className="flex w-full justify-center">
              <Button
                style={ButtonStyle.SIMPLERED}
                label="Profil löschen"
                size={ButtonSize.XS}
              />
              {/* <Button
                style={ButtonStyle.SIMPLE}
                label="Password ändern"
                size={ButtonSize.SMALL}
              /> */}
            </div>
          </div>
        </AuthSession>
      </Suspense>
    </div>
  );
};

export default Profile;
