import { useState } from "react";

export const useAddFavorite = () => {
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFavorite = async (recipeId: number) => {
    setIsFavoriting(true);
    setError(null);
    try {
      // TODO: outsource
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/recipes/${recipeId}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error("Error favoriting recipe");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add to favorites");
    } finally {
      setIsFavoriting(false);
    }
  };

  return { addFavorite, isFavoriting, error };
};
