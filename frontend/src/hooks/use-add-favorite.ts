import { useState } from "react";
import { handleFavoriteRecipe } from "@/services/user/favoriteCreate";
import { useToast } from "./use-toast";

// TODO: delete this file or the store -- tbd
export const useAddFavorite = () => {
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const addFavorite = async (recipeId: number) => {
    setIsFavoriting(true);
    setError(null);

    const success = await handleFavoriteRecipe({ recipeId, toast });
    if (!success) {
      setError("Failed to add to favorites");
    }

    setIsFavoriting(false);
  };

  return { addFavorite, isFavoriting, error };
};
