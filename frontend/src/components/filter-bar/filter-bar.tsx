"use client";

import React, { useState, useEffect } from "react";
import Magnifier from "src/assets/icons/magnifier.svg";
import Bookmark from "src/assets/icons/bookmark.svg";
import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { useSession } from "next-auth/react";
import { Recipe } from "@/services/recipe/recipeService";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import CardListWrapper from "../card-list.tsx/card-list-wrapper";

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
  const seasonalColor = getSeasonColor();
  const { data: session } = useSession();
  const { getDetailedFavorites, isFavoritesActive, setFavoritesActive } =
    useFavoritesStore();

  useEffect(() => {
    const initializeFavorites = async () => {
      if (isFavoritesActive && session) {
        const detailedFavorites = await getDetailedFavorites();
        onShowFavorites(detailedFavorites);
      }
    };
    initializeFavorites();
  }, [session]);

  const toggleFavorites = async () => {
    if (isFavoritesActive) {
      setFavoritesActive(false);
      onHideFavorites();
      return;
    }

    if (!session) return;

    try {
      const detailedFavorites = await getDetailedFavorites();
      onShowFavorites(detailedFavorites);
      setFavoritesActive(true);
    } catch (error) {
      console.error("Error loading detailed favorites:", error);
    }
  };

  return (
    <CardListWrapper
      className="mb-4 flex justify-between gap-2 max-[640px]:mt-8 min-[640px]:pl-6 min-[640px]:pr-7"
      isInFavoriteView={isFavoritesActive}
      onShowFavorites={onShowFavorites}
    >
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
            onClick={() => setInputValue("")}
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
    </CardListWrapper>
  );
};

export default FilterBar;
