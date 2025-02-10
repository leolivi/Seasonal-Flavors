import { authConfig } from "@/auth";
import { getCurrentUser } from "@/services/user/userService";
import { getServerSession } from "next-auth";
import ProfileCard from "@/components/profile-card/profile-card";

/*
  @desc Displays the profile page
*/
const ProfilePage = async () => {
  // retrieve the session
  const session = await getServerSession(authConfig);

  // retrieve the user
  const userData = session?.accessToken
    ? await getCurrentUser(session.accessToken)
    : null;

  // return the profile page
  return (
    <div className="flex justify-center">
      {/* heading */}
      <h1 className="sr-only" aria-label="Profile" tabIndex={0}>
        Profile
      </h1>
      {/* profile card */}
      <ProfileCard userData={userData} />
    </div>
  );
};

export default ProfilePage;
