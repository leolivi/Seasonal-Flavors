import { dataFetch, dataFetchWithToken } from "@/utils/data-fetch";
import { getProfileImage } from "@/services/image/imageService";
import { Recipe } from "../recipe/recipeService";
import { handleLogout } from "@/components/auth-session/handle-logout";

export interface UserData {
  id: number;
  username: string;
  email: string;
  imageSrc?: string;
  accessToken?: string;
}

export const getCurrentUser = async (
  accessToken: string,
): Promise<UserData | null> => {
  try {
    if (!accessToken) {
      return null;
    }

    const profile = await dataFetchWithToken(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
      accessToken,
    );

    if (!profile) {
      await handleLogout();
      return null;
    }

    const userImage = profile.id
      ? await getProfileImage(profile.id)
      : undefined;

    return {
      ...profile,
      imageSrc: userImage?.file_path
        ? userImage.file_path.startsWith("http")
          ? userImage.file_path
          : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userImage.file_path}`
        : undefined,
    };
  } catch (error) {
    console.error("Fehler beim Laden des Benutzers:", error);
    return null;
  }
};

export const getUser = async (userId: number): Promise<UserData | null> => {
  try {
    return await dataFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}`,
    );
  } catch (error) {
    console.error("Fehler beim Laden des Benutzers:", error);
    return null;
  }
};

export const getUserFavorites = async (
  userId: number,
  accessToken: string,
): Promise<Recipe[]> => {
  try {
    return await dataFetchWithToken(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userId}/favorites`,
      accessToken,
    );
  } catch (error) {
    console.error("Fehler beim Laden der Favoriten:", error);
    return [];
  }
};
