import { getSeasonColor } from "@/utils/SeasonUtils";
import BookmarkIcon from "../../assets/icons/bookmark.svg";
import { useFavoritesStore } from "@/store/useFavoritesStore";

interface BookmarkButtonProps {
  recipeId: string;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  "data-testid"?: string;
}

export default function BookmarkButton({
  recipeId,
  onClick,
  className,
  "data-testid": dataTestId,
}: BookmarkButtonProps) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const isFavorite = favorites.some((recipe) => recipe.id === Number(recipeId));
  const seasonalColor = getSeasonColor();

  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-4 hover:drop-shadow-xl"
      aria-label="Bookmark"
      data-testid={dataTestId}
    >
      <BookmarkIcon
        className={`h-10 w-auto ${
          isFavorite ? `fill-${seasonalColor}` : "fill-sfwhite"
        } ${className || ""}`}
      />
    </button>
  );
}
