export const handleUserPatch = async ({ data, userData, toast, router }) => {
  if (!userData) {
    console.error("BeUserdaten sind nicht verfügbar");
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
        description: "User konnte nicht aktualisiert werden.",
      });
      const error = await response.json();
      console.error("Fehler beim Aktualisieren des Users:", error);
      return;
    }

    const responseData = await response.json();
    const recipeId = responseData.recipe?.id;

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Der User wurde erfolgreich aktualisiert.",
    });

    router.refresh();
    return recipeId;
  } catch (error) {
    console.error("Rezept-Aktualisierung fehlgeschlagen:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description:
        "User konnte nicht aktualisiert werden. Bitte erneut versuchen.",
    });
  }
};
