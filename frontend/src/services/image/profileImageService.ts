import { dataFetchWithToken } from "@/lib/data-fetch";
import { getCurrentUser } from "../user/userService";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

export interface ImageData {
  id: number;
  file_path: string;
  alt_text: string;
}

export const getCurrentImage = async (userId: number, accessToken: string) => {
  try {
    const response = await dataFetchWithToken(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images?user_id=${userId}&type=profile`,
      accessToken,
    );

    if (Array.isArray(response) && response.length > 0) {
      return response[0];
    }

    return undefined;
  } catch (error) {
    console.error("Fehler beim Laden des Bildes:", error);
    return undefined;
  }
};
