"use client";
import { Button, ButtonSize } from "../button/button";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { LuBookmark } from "react-icons/lu";
import { Recipe } from "@/services/recipe/recipeService";
import { RegisterBanner } from "../banner/register-banner";
import { Typography } from "../ui/typography";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import useMediaQuery from "@/hooks/use-media-query";

interface RecipeHeaderProps {
  title: string;
  username: string;
  recipe: Recipe;
}

/*
  @desc Recipe header
*/
export const RecipeHeader = ({
  title,
  username,
  recipe,
}: RecipeHeaderProps) => {
  // get the router
  const router = useRouter();
  // get the session status
  const { status } = useSession();
  // state for the register banner
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);
  // get the favorites store
  const { toggleFavorite } = useFavoritesStore();
  // get the favorites
  const favorites = useFavoritesStore((state) => state.favorites);
  // get the toast
  const { toast } = useToast();
  // get the seasonal color
  const seasonalColor = getSeasonColor();
  // check if the user is on a desktop
  const isDesktop = useMediaQuery("(min-width: 720px)");

  const isFavorite = recipe?.id
    ? favorites.some((favorite) => favorite.id === recipe.id)
    : false;

  // handle the go back click
  const handleBackClick = () => {
    router.back();
  };

  // handle the save click
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

  // handle the close of the register banner
  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
  };

  return (
    <div>
      <div className="mt-8 w-fit cursor-pointer">
        {/* go back button */}
        <button onClick={handleBackClick} aria-label="Go back">
          <HiOutlineArrowLeft
            size={25}
            className="stroke-2 text-sfblack"
            data-testid="arrow-left"
          />
        </button>
      </div>

      {/* recipe title */}
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

        {/* recipe author */}
        <Typography variant="body" className="mb-4 min-[640px]:mb-0">
          <small className="mt-2 text-sfblack">von {username}</small>
        </Typography>

        {/* save button */}
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

        {/* register banner */}
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
