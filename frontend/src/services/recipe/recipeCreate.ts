import { Recipe } from "./recipeService";
import { UserData } from "../user/userService";
import { TagData } from "../tag/tagService";

type CreateRecipeInput = Omit<Recipe, "id" | "user_id"> & {
  tags: TagData["id"][];
};

export const handleCreateRecipe = async ({
  data,
  userData,
  toast,
  router,
}: {
  data: CreateRecipeInput;
  userData: UserData;
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void;
  router: {
    push: (path: string) => void;
  };
}) => {
  if (!userData) {
    console.error("Benutzerdaten sind nicht verfügbar");
    return;
  }

  try {
    const payload = {
      ...data,

      user_id: userData.id,
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
