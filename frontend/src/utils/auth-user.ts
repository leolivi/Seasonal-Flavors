import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { getCurrentUser, UserData } from "@/services/user/userService";

/*
  @desc Get authenticated user function
*/
export async function getAuthenticatedUser(): Promise<UserData | null> {
  let session;

  // get session from server or client
  if (
    typeof window === "undefined" ||
    window.location.href.includes("undefined")
  ) {
    session = await getServerSession(authConfig);
  } else {
    session = await getSession();
  }

  if (!session?.accessToken) return null;

  // get current user
  const user = await getCurrentUser(session.accessToken);
  return user || null;
}
