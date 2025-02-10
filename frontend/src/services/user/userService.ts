import { getProfileImage } from "@/services/image/imageService";
import { handleLogout } from "@/components/auth-session/handle-logout";
import { UserData, RecipeData } from "@/types/interfaces";

/*
  @desc Get current user
*/
export const getCurrentUser = async (
  accessToken: string,
): Promise<UserData | null> => {
  try {
    if (!accessToken) {
      return null;
    }

    // redirect to api handler get-user
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

/*
  @desc Get user
*/
export const getUser = async (userId: number): Promise<UserData | null> => {
  // redirect to api handler get-user
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

/*
  @desc Get user favorites
*/
export const getUserFavorites = async (
  userId: number,
  accessToken: string,
): Promise<RecipeData[]> => {
  // redirect to api handler get-user-favorites
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
