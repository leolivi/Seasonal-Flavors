import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import { getCurrentUser, UserData } from "@/services/user/userService";
import { redirect } from "next/navigation";

export async function getAuthenticatedUser(): Promise<UserData | null> {
  let session;

  if (
    typeof window === "undefined" ||
    window.location.href.includes("undefined")
  ) {
    session = await getServerSession(authConfig);
  } else {
    session = await getSession();
  }

  if (!session?.accessToken) redirect("/session");

  const user = await getCurrentUser(session.accessToken);
  return user || null;
}
