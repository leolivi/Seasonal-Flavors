/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { RecipeData, TagData } from "@/types/interfaces";
import { getCurrentUser, getUserFavorites } from "@/services/user/userService";
import { getRecipeTags } from "@/services/tag/tagService";
import { deleteFavoriteRecipe } from "@/services/user/favoriteDelete";
import { handleFavoriteRecipe } from "@/services/user/favoriteCreate";
import { getRecipeImage } from "@/services/image/imageService";

interface FavoritesStore {
  favorites: RecipeData[];
  setFavorites: (favorites: RecipeData[]) => void;
  addFavorite: (recipe: RecipeData) => void;
  removeFavorite: (recipeId: number) => void;
  toggleFavorite: (
    recipe: RecipeData,
    toast: any,
    isInFavoriteView?: boolean,
    onShowFavorites?: (favorites: RecipeData[]) => void,
  ) => Promise<void>;
  loadFavorites: (accessToken: string) => Promise<void>;
  getDetailedFavorites: () => Promise<RecipeData[]>;
  isFavoritesActive: boolean;
  setFavoritesActive: (isActive: boolean) => void;
}

/*
  @desc Favorites store
*/
export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  isFavoritesActive: false,
  setFavoritesActive: (isActive) => set({ isFavoritesActive: isActive }),
  setFavorites: (favorites) => set({ favorites }),

  addFavorite: (recipe) =>
    set((state) => ({
      favorites: [...state.favorites, recipe],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((recipe) => recipe.id !== recipeId),
    })),

  toggleFavorite: async (
    recipe,
    toast,
    isInFavoriteView = false,
    onShowFavorites,
  ) => {
    const isFavorited = get().favorites.some((fav) => fav.id === recipe.id);

    // if recipe is favorited, delete it
    // if recipe is not favorited, add it
    try {
      const success = isFavorited
        ? await deleteFavoriteRecipe({ recipeId: recipe.id, toast })
        : await handleFavoriteRecipe({ recipeId: recipe.id, toast });

      if (success) {
        if (isFavorited) {
          get().removeFavorite(recipe.id);

          if (isInFavoriteView && onShowFavorites) {
            const detailedFavorites = await get().getDetailedFavorites();
            onShowFavorites(detailedFavorites);
          }
        } else {
          get().addFavorite(recipe);
          if (isInFavoriteView && onShowFavorites) {
            const detailedFavorites = await get().getDetailedFavorites();
            onShowFavorites(detailedFavorites);
          }
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
  },

  // fetch users favorites
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

  // fetch detailed favorites
  getDetailedFavorites: async () => {
    const favorites = get().favorites;

    try {
      const detailedFavorites = await Promise.all(
        favorites.map(async (recipe) => {
          const imageData = await getRecipeImage(recipe.id);
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
      return favorites;
    }
  },
}));
