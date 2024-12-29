import { signOut } from "next-auth/react";

export const handleUserDelete = async (userId, toast) => {
  if (!userId) {
    console.error("Keine User-ID angegeben");
    return false;
  }

  try {
    const response = await fetch(`/api/auth/delete-user`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: data.message || "User konnte nicht gelöscht werden.",
      });
      throw new Error(data.message || "User deletion failed");
    }

    toast({
      variant: "default",
      title: "Erfolg",
      description: "User wurde erfolgreich gelöscht.",
    });

    await signOut({ callbackUrl: "/session" });
    return true;
  } catch (error) {
    console.error("User-Löschung fehlgeschlagen:", error);
    return false;
  }
};
