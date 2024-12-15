"use client";

import React, { useState, useEffect } from "react";
import Magnifier from "src/assets/icons/magnifier.svg";
import Bookmark from "src/assets/icons/bookmark.svg";
import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { dataFetch, dataFetchWithToken } from "@/lib/data-fetch";
import { useSession } from "next-auth/react";

interface FilterBarProps {
  title?: string;
  onShowFavorites: (favorites: any[]) => void;
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
      const user = await dataFetchWithToken(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        session.accessToken,
      );

      const favorites = await dataFetchWithToken(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${user.id}/favorites`,
        session.accessToken,
      );

      const detailedFavorites = await Promise.all(
        favorites.map(async (recipe: any) => {
          const imageData = await dataFetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/images?recipe_id=${recipe.id}`,
          );
          const seasonData = await dataFetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/${recipe.id}/tags`,
          );

          const firstImage = imageData[0] || {};
          const seasonTags = seasonData.map((tag: any) => tag.name).join(", ");

          return {
            id: recipe.id,
            imageSrc: firstImage.file_path || "",
            imageAlt: firstImage.alt_text || recipe.title,
            title: recipe.title,
            prepDuration: recipe.prep_time,
            season: seasonTags,
          };
        }),
      );

      onShowFavorites(detailedFavorites || []);
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
