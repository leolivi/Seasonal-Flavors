import FavoritesClient from "@/components/favorites-client/favorites-client";
import { getAuthenticatedUser } from "@/utils/auth-user";

/*
  @desc Displays the favorites page
*/
const FavoritesPage = async () => {
  // retrieve the user
  const user = await getAuthenticatedUser();
  // if there is no user, return null
  if (!user) return null;

  // return the favorites client
  return <FavoritesClient />;
};

export default FavoritesPage;
