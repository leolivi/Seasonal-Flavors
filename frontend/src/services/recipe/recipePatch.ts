import { RecipeData, TagData, UserData } from "@/types/interfaces";

export type EditRecipeInput = Omit<RecipeData, "user_id"> & {
  tags: TagData["id"][];
  id?: number;
};

/*
  @desc Handle recipe patch
*/
export const handleRecipePatch = async ({
  data,
  userData,
  toast,
  router,
  updateRecipe,
}: {
  data: EditRecipeInput;
  userData: UserData;
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void;
  router: {
    push: (path: string) => void;
    refresh: () => void;
  };
  updateRecipe: (recipe: RecipeData) => void;
}) => {
  if (!userData) {
    console.error("Benutzerdaten sind nicht verfügbar");
    return;
  }

  // redirect to api handler edit-recipe
  try {
    const payload = {
      ...data,
      user_id: userData.id,
    };

    const response = await fetch(`/api/edit-recipe/${data.id}`, {
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
    const updatedRecipe = responseData.recipe;

    if (updatedRecipe) {
      const normalizedRecipe = {
        ...updatedRecipe,
        ingredients: updatedRecipe.ingredients || "",
        steps: updatedRecipe.steps || "[]",
        season: data.tags,
      };

      updateRecipe(normalizedRecipe);
    }

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Das Rezept wurde erfolgreich aktualisiert.",
    });

    router.push("/my-recipes");
    router.refresh();
    return updatedRecipe;
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
