"use client";
import { Button, ButtonSize } from "../button/button";
import { Typography } from "../ui/typography";
import { LuBookmark } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterBanner } from "../banner/register-banner";
import { useSession } from "next-auth/react";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { Recipe } from "@/services/recipe/recipeService";
import { useToast } from "@/hooks/use-toast";
import { HiOutlineArrowLeft } from "react-icons/hi";
import useMediaQuery from "@/hooks/use-media-query";

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
  const { status } = useSession();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);
  const { toggleFavorite } = useFavoritesStore();
  const favorites = useFavoritesStore((state) => state.favorites);
  const { toast } = useToast();
  const seasonalColor = getSeasonColor();
  const isDesktop = useMediaQuery("(min-width: 720px)");

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
          <HiOutlineArrowLeft
            size={25}
            className="stroke-2 text-sfblack"
            data-testid="arrow-left"
          />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <Typography variant="heading1">
          <h1
            className="mt-4 text-center font-cordaBold text-sfblack"
            aria-label={title}
            tabIndex={0}
          >
            {title}
          </h1>
        </Typography>
        <Typography variant="body" className="mb-4 min-[640px]:mb-0">
          <small className="mt-2 text-sfblack">von {username}</small>
        </Typography>

        <Button
          label={isFavorite ? `gespeichert` : `speichern`}
          iconLeft={
            <LuBookmark
              className={`h-8 w-auto ${
                isFavorite ? `fill-${seasonalColor}` : "fill-sfwhite"
              }`}
            />
          }
          onClick={handleSaveClick}
          size={isDesktop ? ButtonSize.SMALL : ButtonSize.XS}
        />

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
      </div>
    </div>
  );
};
