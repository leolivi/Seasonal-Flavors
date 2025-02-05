import { getServerSession } from "next-auth";
import ProfileCard from "@/components/profile-card/profile-card";
import { getCurrentUser } from "@/services/user/userService";
import { authConfig } from "@/auth";

const ProfilePage = async () => {
  const session = await getServerSession(authConfig);

  const userData = session?.accessToken
    ? await getCurrentUser(session.accessToken)
    : null;

  return (
    <div className="flex justify-center">
      <h1 className="sr-only" aria-label="Profile" tabIndex={0}>
        Profile
      </h1>
      <ProfileCard userData={userData} />
    </div>
  );
};

export default ProfilePage;
