import { UserData } from "./userService";

interface HandleUserPatchParams {
  data: Partial<Pick<UserData, "id" | "username" | "email">>;
  userData: UserData;
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void;
}

export const handleUserPatch = async ({
  data,
  userData,
  toast,
}: HandleUserPatchParams) => {
  if (!userData) {
    return {
      errors: [{ field: "general", message: "Benutzerdaten nicht verfügbar" }],
    };
  }

  try {
    const response = await fetch("/api/edit-user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { errors: responseData.errors || [] };
    }

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Dein Profil wurde aktualisiert.",
    });

    return { success: true };
  } catch (error) {
    return {
      errors: [
        {
          field: "general",
          message: "Ein unerwarteter Fehler ist aufgetreten",
        },
      ],
    };
  }
};
