export const handleUserPatch = async ({ data, userData, toast, router }) => {
  if (!userData) {
    console.error("Userdaten sind nicht verfügbar");
    return {
      errors: [
        { field: "general", message: "Benutzerdaten sind nicht verfügbar" },
      ],
    };
  }

  try {
    const payload = {
      id: data.id,
      username: data.username,
      email: data.email,
    };

    const response = await fetch("/api/edit-user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        errors: [
          {
            field: responseData.field || "username",
            message: responseData.message || "Ein Fehler ist aufgetreten",
          },
        ],
      };
    }

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Der User wurde erfolgreich aktualisiert.",
    });

    router.refresh();
    return { success: true };
  } catch (error) {
    console.error("Rezept-Aktualisierung fehlgeschlagen:", error);
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
