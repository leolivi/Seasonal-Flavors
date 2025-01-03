import { signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { toast } = useToast();

export const handleLogout = async () => {
  try {
    toast({
      variant: "default",
      title: "Abgemeldet",
      description: "Du wurdest erfolgreich abgemeldet.",
    });
    await signOut({ redirect: true, callbackUrl: "/session" });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Fehler",
      description: "Abmeldung fehlgeschlagen. Bitte versuche es erneut.",
    });
    console.error("Logout failed: ", error);
  }
};
