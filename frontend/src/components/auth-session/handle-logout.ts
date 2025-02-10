import { signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

/*
  @desc Handles the logout
*/
export const handleLogout = async () => {
  try {
    // sign out and redirect to the session page
    await signOut({ redirect: true, callbackUrl: "/session" });
    // show success toast
    toast({
      variant: "default",
      title: "Abgemeldet",
      description: "Du wurdest erfolgreich abgemeldet.",
    });
  } catch (error) {
    // show error toast
    toast({
      variant: "destructive",
      title: "Fehler",
      description: "Abmeldung fehlgeschlagen. Bitte versuche es erneut.",
    });
    // log error
    console.error("Logout failed: ", error);
  }
};
