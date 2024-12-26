import { dataFetchWithToken } from "@/lib/data-fetch";
import { getProfileImage } from "@/services/image/imageService";
import { Recipe } from "../recipe/recipeService";

export interface UserData {
  id: number;
  username: string;
  email: string;
  imageSrc?: string;
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
      return null;
    }

    const userImage = profile.id
      ? await getProfileImage(profile.id, accessToken)
      : undefined;

    return {
      ...profile,
      imageSrc: userImage?.file_path
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userImage.file_path}`
        : "",
    };
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
