import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { getCurrentUser, UserData } from "@/services/user/userService";

export async function getAuthenticatedUser(): Promise<UserData | null> {
  const session = await getServerSession(authConfig);
  if (!session) return null;

  const user = await getCurrentUser(session.accessToken);
  return user || null;
}
