export const handleUserPatch = async ({ data, userData, toast, router }) => {
  if (!userData) {
    console.error("Benutzerdaten sind nicht verfügbar");
    return;
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

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Rezept-Aktualisierung fehlgeschlagen.",
      });
      const error = await response.json();
      console.error("Fehler beim Aktualisieren des Rezepts:", error);
      return;
    }

    const responseData = await response.json();
    const recipeId = responseData.recipe?.id;

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Das Rezept wurde erfolgreich aktualisiert.",
    });

    router.refresh();
    return recipeId;
  } catch (error) {
    console.error("Rezept-Aktualisierung fehlgeschlagen:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description:
        "Rezept-Aktualisierung fehlgeschlagen. Bitte erneut versuchen.",
    });
  }
};
