"use client";

import React, { useState, useEffect } from "react";
import Magnifier from "src/assets/icons/magnifier.svg";
import Bookmark from "src/assets/icons/bookmark.svg";
import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { useSession } from "next-auth/react";
import { Recipe } from "@/services/recipe/recipeService";
import { getRecipeTags, TagData } from "@/services/tag/tagService";
import { getCurrentUser, getUserFavorites } from "@/services/user/userService";
import { getRecipeImage } from "@/services/image/imageService";

interface FilterBarProps {
  title?: string;
  onShowFavorites: (favorites: Recipe[]) => void;
  onHideFavorites: () => void;
}

const FilterBar = ({
  title = "",
  onShowFavorites,
  onHideFavorites,
}: FilterBarProps) => {
  const [inputValue, setInputValue] = useState(title);
  const [isFavoritesActive, setIsFavoritesActive] = useState(false);
  const seasonalColor = getSeasonColor();
  const { data: session } = useSession();

  useEffect(() => {
    setInputValue(title);
  }, [title]);

  const clearInput = () => setInputValue("");

  const toggleFavorites = async () => {
    if (isFavoritesActive) {
      setIsFavoritesActive(false);
      onHideFavorites();
      return;
    }

    if (!session) return;

    try {
      const user = await getCurrentUser(session.accessToken);
      if (!user) return;

      const favorites = await getUserFavorites(user.id, session.accessToken);

      const detailedFavorites = await Promise.all(
        favorites.map(async (recipe: Recipe) => {
          const imageData = await getRecipeImage(recipe.id);
          const seasonData = await getRecipeTags(recipe.id);

          return {
            ...recipe,
            imageSrc: imageData[0]?.file_path || "",
            imageAlt: imageData[0]?.alt_text || recipe.title,
            season: seasonData.map((tag: TagData) => tag.name).join(", "),
          };
        }),
      );

      onShowFavorites(detailedFavorites);
      setIsFavoritesActive(true);
    } catch (error) {
      console.error("Error fetching detailed favorites:", error);
    }
  };

  return (
    <div className="mb-4 flex justify-between gap-2 max-[640px]:mt-8 min-[640px]:pl-6 min-[640px]:pr-7">
      {/* Toggle Favorites Button */}
      <button
        data-testid="favorites-toggle-button"
        onClick={toggleFavorites}
        className={`border-${seasonalColor}-dark flex items-center gap-4 border-b-2 px-8 text-lg font-medium text-sfblack max-[540px]:px-4`}
      >
        <Bookmark
          className={`h-8 w-auto ${
            isFavoritesActive ? `fill-${seasonalColor}` : `fill-none`
          }`}
        />
        <Typography variant="body">Favoriten</Typography>
      </button>

      {/* Search Form */}
      <form
        action="/recipes"
        method="get"
        className={`flex items-center rounded-md border-2 border-${seasonalColor}-dark bg-${seasonalColor}-light px-2 py-1 hover:bg-white active:bg-white`}
      >
        <Typography variant="body">
          <input
            type="text"
            name="title"
            placeholder="suchen"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-transparent text-sfblack outline-none focus:border-none active:border-none max-[540px]:w-[10rem] max-[480px]:w-[5rem]"
          />
        </Typography>
        {inputValue ? (
          <button
            type="button"
            onClick={clearInput}
            className="ml-2 text-sfblack"
          >
            &#x2715;
          </button>
        ) : (
          <button type="submit" className="ml-2">
            <Magnifier />
          </button>
        )}
      </form>
    </div>
  );
};

export default FilterBar;
