import { useToast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";

const { toast } = useToast();
export const handleLogout = async () => {
  try {
    toast({
      variant: "default",
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet.",
    });
    await signOut({ redirect: true, callbackUrl: "/session" });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Fehler",
      description: "Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.",
    });
    console.error("Logout failed: ", error);
  }
};
