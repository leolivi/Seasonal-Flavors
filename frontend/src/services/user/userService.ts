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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      await handleLogout();
      throw new Error(data.message || "Fehler beim Laden des Benutzers");
    }

    const userImage = data.id ? await getProfileImage(data.id) : undefined;

    return {
      ...data,
      imageSrc: userImage?.file_path || undefined,
    };
  } catch (error) {
    console.error("Fehler beim Laden des Benutzers:", error);
    return null;
  }
};

export const getUser = async (userId: number): Promise<UserData | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-user?user_id=${userId}`,
      {
        cache: "no-store",
      },
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden des Benutzers");
    }

    const userImage = await getProfileImage(userId);

    return {
      ...data,
      imageSrc: userImage?.file_path || undefined,
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-user-favorites?user_id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Fehler beim Laden der Favoriten");
    }

    return data;
  } catch (error) {
    console.error("Fehler beim Laden der Favoriten:", error);
    return [];
  }
};
