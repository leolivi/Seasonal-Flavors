"use client";
import { Button } from "../button/button";
import { Typography } from "../ui/typography";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterBanner } from "../banner/register-banner";
import { useSession } from "next-auth/react";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { Recipe } from "@/services/recipe/recipeService";
import { useToast } from "@/hooks/use-toast";

interface RecipeHeaderProps {
  title: string;
  username: string;
  recipe: Recipe;
}

export const RecipeHeader = ({
  title,
  username,
  recipe,
}: RecipeHeaderProps) => {
  const router = useRouter();
  // data: session
  const { status } = useSession();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);
  const { toggleFavorite } = useFavoritesStore();
  const favorites = useFavoritesStore((state) => state.favorites);
  const { toast } = useToast();
  const seasonalColor = getSeasonColor();

  const isFavorite = recipe?.id
    ? favorites.some((favorite) => favorite.id === recipe.id)
    : false;

  const handleBackClick = () => {
    router.back();
  };

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "unauthenticated") {
      setShowRegisterBanner(true);
      return;
    }

    if (recipe) {
      await toggleFavorite(recipe, toast);
    }
  };

  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
  };

  return (
    <div>
      <div className="mt-8 w-fit cursor-pointer">
        <button onClick={handleBackClick} aria-label="Go back">
          <ArrowLeft />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <Typography variant="heading1">
          <h1 className="mt-4 font-cordaBold text-sfblack">{title}</h1>
        </Typography>
        <Typography variant="body">
          <small className="mt-2 text-sfblack">von {username}</small>
        </Typography>

        <Button
          label={isFavorite ? `gespeichert` : `speichern`}
          iconLeft={
            <Bookmark
              className={`h-6 w-auto ${
                isFavorite ? `fill-${seasonalColor}` : "fill-sfwhite"
              }`}
            />
          }
          onClick={handleSaveClick}
        />

        {showRegisterBanner && (
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2">
            <RegisterBanner
              label="anmelden"
              showCloseBtn={true}
              onClose={handleCloseBanner}
            />
          </div>
        )}
      </div>
    </div>
  );
};
