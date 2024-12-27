import { create } from "zustand";
import { Recipe } from "@/services/recipe/recipeService";
import { getCurrentUser, getUserFavorites } from "@/services/user/userService";

interface FavoritesStore {
  favorites: Recipe[];
  setFavorites: (favorites: Recipe[]) => void;
  loadFavorites: (accessToken: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
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
}));
