import { useState } from "react";
import { Recipe } from "@/services/recipe/recipeService";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    );
  };

  const deleteRecipe = (recipeId: number) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== recipeId));
  };

  return {
    recipes,
    setRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  };
};
