"use client";

import React, { useState, useEffect } from "react";
import Magnifier from "src/assets/icons/magnifier.svg";
import Cross from "@/assets/icons/cross.svg";
import Bookmark from "src/assets/icons/bookmark.svg";
import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { useSession } from "next-auth/react";
import { Recipe } from "@/services/recipe/recipeService";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import CardListWrapper from "../card-list.tsx/card-list-wrapper";
import { RegisterBanner } from "../banner/register-banner";

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
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const titleFromQuery = searchParams.get("title");
    if (titleFromQuery) {
      setInputValue(titleFromQuery);
    }
  }, []);

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

    if (!session) {
      setShowRegisterBanner(true);
      return;
    }

    try {
      const detailedFavorites = await getDetailedFavorites();
      onShowFavorites(detailedFavorites);
      setFavoritesActive(true);
    } catch (error) {
      console.error("Error loading detailed favorites:", error);
    }
  };

  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
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
        {inputValue && setInputValue ? (
          <button
            type="button"
            data-testid="clear-button"
            onClick={() => {
              setInputValue("");
            }}
            className="ml-2 text-sfblack"
          >
            <Cross className="m-2 w-6 cursor-pointer stroke-sfblack stroke-2" />
          </button>
        ) : (
          <button type="submit" className="ml-2">
            <Magnifier />
          </button>
        )}
      </form>
      {showRegisterBanner && (
        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2">
          <RegisterBanner
            content={
              <>
                erstelle deine eigene
                <br />
                Rezeptesammlung!
              </>
            }
            label="anmelden"
            showCloseBtn={true}
            onClose={handleCloseBanner}
          />
        </div>
      )}
    </CardListWrapper>
  );
};

export default FilterBar;
