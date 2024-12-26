import { dataFetchWithToken } from "@/lib/data-fetch";

export const getCurrentUser = async (accessToken: string) => {
  try {
    if (!accessToken) {
      return null;
    }

    return await dataFetchWithToken(
      `${process.env.BACKEND_URL}/api/user`,
      accessToken,
    );
  } catch (error) {
    console.error("Fehler beim Laden des Benutzers:", error);
    return null;
  }
};
