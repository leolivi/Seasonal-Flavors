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
    <div className="flex justify-center px-4 pb-8 min-[640px]:px-8">
      <h1 className="sr-only">Dashboard</h1>
      <ProfileCard userData={userData} />
    </div>
  );
};

export default ProfilePage;
