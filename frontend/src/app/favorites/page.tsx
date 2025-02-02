import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FavoritesClient from "../../components/favorites-client/favorites-client";
import { authConfig } from "@/auth";

const FavoritesPage = async () => {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/session");
  }

  return <FavoritesClient />;
};

export default FavoritesPage;
