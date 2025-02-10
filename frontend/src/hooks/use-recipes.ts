import { useState } from "react";
import { RecipeData } from "@/types/interfaces";

/*
  @desc Hook to handle recipes
*/
export const useRecipes = () => {
  // state for the recipes
  const [recipes, setRecipes] = useState<RecipeData[]>([]);

  // add a recipe
  const addRecipe = (recipe: RecipeData) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  // update a recipe
  const updateRecipe = (updatedRecipe: RecipeData) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    );
  };

  // delete a recipe
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
