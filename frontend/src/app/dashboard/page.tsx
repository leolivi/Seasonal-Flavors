"use client";

import { Button, ButtonStyle } from "@/components/button/button";
import ProfileCard from "@/components/profile-card/profile-card";
import {
  AuthSession,
  SessionLoader,
} from "@/components/auth-session/auth-session";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import cardImage from "@/assets/images/dashboard-image.jpg";
import { Suspense, useEffect, useState } from "react";
import DashboardCard from "@/components/dashboard-card/dashboard-card";
import { FaPlus } from "react-icons/fa6";
import { getSeasonColor } from "@/utils/SeasonUtils";
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

const Dashboard = () => {
  const { toast } = useToast();
  const seasonalColor = getSeasonColor();
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

  const handleLogout = async () => {
    try {
      toast({
        variant: "default",
        title: "Abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet.",
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      await signOut({ redirect: true, callbackUrl: "/session" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      });
      console.error("Logout failed: ", error);
    }
  };

  // If userData is not yet loaded, show a loading state
  if (!userData) {
    return <SessionLoader />;
  }

  return (
    <div className="px-4 pb-8 min-[640px]:px-8">
      <h1 className="sr-only">Dashboard</h1>
      <Suspense fallback={<SessionLoader />}>
        <AuthSession>
          <div className="flex flex-col gap-8 min-[850px]:flex-row min-[850px]:gap-4">
            <div className="flex flex-1 flex-col gap-8 min-[1200px]:w-1/2">
              <DashboardCard
                href="/recipes/create"
                label="neues Rezept erstellen"
                fontColor="sf-white"
                icon={
                  <div
                    className={`inline-flex items-center justify-center rounded-full bg-${seasonalColor}-dark p-3`}
                  >
                    <FaPlus size={30} className="text-sfwhite" />
                  </div>
                }
              />
              <DashboardCard
                href="/my-recipes"
                label="meine Rezepte"
                backgroundImage={cardImage.src}
              />
            </div>

            <div className="flex flex-col items-center gap-4 min-[850px]:ml-4 min-[1200px]:w-1/2">
              <ProfileCard name={userData.username} email={userData.email} />
              <Button
                style={ButtonStyle.OUTLINERED}
                label="abmelden"
                onClick={handleLogout}
              />
            </div>
          </div>
        </AuthSession>
      </Suspense>
    </div>
  );
};

export default Dashboard;
