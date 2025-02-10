import { getSeasonColor } from "@/utils/SeasonUtils";
import { LuBookmark } from "react-icons/lu";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

interface BookmarkButtonProps {
  recipeId: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  "data-testid"?: string;
}

/*
  @desc BookmarkButton component
*/
export default function BookmarkButton({
  recipeId,
  onClick,
  className,
  "data-testid": dataTestId,
}: BookmarkButtonProps) {
  // get the favorites
  const favorites = useFavoritesStore((state) => state.favorites);
  // check if the recipe is a favorite
  const isFavorite = favorites.some((recipe) => recipe.id === Number(recipeId));
  // get the current season
  const seasonalColor = getSeasonColor();

  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-4 hover:drop-shadow-xl"
      aria-label="Bookmark"
      data-testid={dataTestId}
    >
      {/* bookmark icon */}
      <LuBookmark
        className={`h-10 w-auto stroke-2 min-[640px]:h-12 ${
          isFavorite ? `fill-${seasonalColor}` : "fill-sfwhite"
        } ${className || ""}`}
      />
    </button>
  );
}
