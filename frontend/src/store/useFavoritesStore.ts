/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Recipe } from "@/services/recipe/recipeService";
import { getCurrentUser, getUserFavorites } from "@/services/user/userService";
import { handleFavoriteRecipe } from "@/services/user/favoriteCreate";
import { deleteFavoriteRecipe } from "@/services/user/favoriteDelete";
import { getCurrentImage } from "@/services/image/imageService";
import { getRecipeTags, TagData } from "@/services/tag/tagService";

interface FavoritesStore {
  favorites: Recipe[];
  setFavorites: (favorites: Recipe[]) => void;
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeId: number) => void;
  toggleFavorite: (
    recipe: Recipe,
    toast: any,
    router: any,
    onFavoritesChange?: (favorites: Recipe[]) => void,
  ) => Promise<void>;
  loadFavorites: (accessToken: string) => Promise<void>;
  getDetailedFavorites: () => Promise<Recipe[]>;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  setFavorites: (favorites) => set({ favorites }),

  addFavorite: (recipe) =>
    set((state) => ({
      favorites: [...state.favorites, recipe],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((recipe) => recipe.id !== recipeId),
    })),

  toggleFavorite: async (recipe, toast, router, onFavoritesChange) => {
    const isFavorited = get().favorites.some((fav) => fav.id === recipe.id);

    try {
      const success = isFavorited
        ? await deleteFavoriteRecipe({ recipeId: recipe.id, toast, router })
        : await handleFavoriteRecipe({ recipeId: recipe.id, toast, router });

      if (success) {
        if (isFavorited) {
          get().removeFavorite(recipe.id);
        } else {
          get().addFavorite(recipe);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }

    if (onFavoritesChange) {
      onFavoritesChange(get().favorites);
    }
  },

  loadFavorites: async (accessToken) => {
    try {
      const user = await getCurrentUser(accessToken);
      if (!user) return;
      const favorites = await getUserFavorites(user.id, accessToken);
      set({ favorites: favorites || [] });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  },

  getDetailedFavorites: async () => {
    const favorites = get().favorites;

    try {
      const detailedFavorites = await Promise.all(
        favorites.map(async (recipe) => {
          const imageData = await getCurrentImage(recipe.id);
          const seasonData = await getRecipeTags(recipe.id);
          const seasonTags = seasonData
            .map((tag: TagData) => tag.name)
            .join(", ");

          return {
            ...recipe,
            imageSrc: imageData?.file_path,
            imageAlt: imageData?.alt_text,
            season: seasonTags,
          };
        }),
      );

      return detailedFavorites;
    } catch (error) {
      console.error("Error getting detailed favorites:", error);
      return favorites; // Fallback zu den basic favorites
    }
  },
}));
