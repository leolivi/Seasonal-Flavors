import ProfileCard from "@/components/profile-card/profile-card";
import { getAuthenticatedUser } from "@/utils/auth-user";

/*
  @desc Displays the profile page
*/
const ProfilePage = async () => {
  // retrieve the user
  const user = await getAuthenticatedUser();
  // if there is no user, return null
  if (!user) return null;

  // return the profile page
  return (
    <div className="flex justify-center">
      {/* heading */}
      <h1 className="sr-only" aria-label="Profile" tabIndex={0}>
        Profile
      </h1>
      {/* profile card */}
      <ProfileCard userData={user} />
    </div>
  );
};

export default ProfilePage;
