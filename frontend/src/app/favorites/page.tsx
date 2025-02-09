import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FavoritesClient from "@/components/favorites-client/favorites-client";

/*
  @return array|Response
  @desc Displays the favorites page
*/
const FavoritesPage = async () => {
  // retrieve the session
  const session = await getServerSession(authConfig);

  // if there is no session, redirect to the session page
  if (!session) {
    redirect("/session");
  }

  // return the favorites client
  return <FavoritesClient />;
};

export default FavoritesPage;
