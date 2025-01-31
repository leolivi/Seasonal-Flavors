import { create } from "zustand";
import { Recipe } from "@/services/recipe/recipeService";

interface RecipesStore {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  addRecipe: (recipe: Recipe) => void;
  deleteRecipe: (recipeId: number) => void;
  updateRecipe: (updatedRecipe: Recipe) => void;
}

export const useRecipesStore = create<RecipesStore>((set) => ({
  recipes: [],
  setRecipes: (recipes) => set({ recipes }),
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),
  deleteRecipe: (recipeId) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== recipeId),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
      ),
    })),
}));
