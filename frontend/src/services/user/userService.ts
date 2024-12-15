import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { dataFetchWithToken } from "@/lib/data-fetch";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.accessToken) {
      return null;
    }

    return await dataFetchWithToken(
      `${process.env.BACKEND_URL}/api/user`,
      session.accessToken,
    );
  } catch (error) {
    console.error("Fehler beim Laden des Benutzers:", error);
    return null;
  }
};
