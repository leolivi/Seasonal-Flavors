export const handleCreateRecipe = async ({
  data,
  userData,
  editorContent,
  toast,
  router,
}) => {
  if (!userData) {
    console.error("Benutzerdaten sind nicht verfügbar");
    return;
  }

  try {
    const payload = {
      ...data,
      cooking_time: data.cooking_time,
      prep_time: data.prep_time,
      servings: data.servings,
      steps: JSON.stringify(editorContent),
      user_id: userData.id,
      tags: data.tags,
    };

    const response = await fetch("/api/create-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Rezept-Erstellung fehlgeschlagen.",
      });
      const error = await response.json();
      console.error("Fehler beim Erstellen des Rezepts:", error);
      return;
    }

    const responseData = await response.json();
    const recipeId = responseData.recipe?.id;

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Das Rezept wurde erfolgreich erstellt.",
    });

    router.push("/my-recipes");

    return recipeId;
  } catch (error) {
    console.error("Rezept-Erstellung fehlgeschlagen:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description: "Rezept-Erstellung fehlgeschlagen. Bitte erneut versuchen.",
    });
  }
};
