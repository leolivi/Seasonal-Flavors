import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { FaRegClock } from "react-icons/fa6";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { handleImageDelete } from "@/services/image/imageDelete";
import { handleRecipeDelete } from "@/services/recipe/recipeDelete";
import { ImageData, getRecipeImage } from "@/services/image/imageService";
import { Recipe } from "@/services/recipe/recipeService";
import { ToastAction } from "@radix-ui/react-toast";
import { Typography } from "../ui/typography";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import BookmarkButton from "../ui/bookmark";
import Heart from "../ui/heart";
import Image from "next/image";

interface CardProps extends Recipe {
  showDetail?: boolean;
  showBookmark?: boolean;
  showEdit?: boolean;
  onBookmarkClick?: (e: React.MouseEvent) => void;
  onEditClick?: (e: React.MouseEvent) => void;
  deleteRecipe: (id: number) => void;
  priority?: boolean;
}

/*
  @desc Displays a card with a recipe
*/
export default function Card({
  showDetail = false,
  showBookmark = false,
  showEdit = false,
  onBookmarkClick,
  onEditClick,
  deleteRecipe,
  priority,
  ...recipe
}: CardProps) {
  // get the image data
  const [imageData, setImageData] = useState<ImageData>();

  // get the router
  const router = useRouter();

  // get the toast
  const { toast } = useToast();

  // fetch the image data
  useEffect(() => {
    const fetchImageData = async () => {
      if (recipe.id) {
        const fetchedImageData = await getRecipeImage(recipe.id);
        setImageData(fetchedImageData);
      }
    };
    fetchImageData();
  }, [recipe.id]);

  // get the seasonal colors
  const seasonColors =
    recipe.season && typeof recipe.season === "string"
      ? recipe.season.split(",").map((season) => getSeasonColor(season.trim()))
      : [];

  // handle the recipe delete
  const handleDelete = async () => {
    if (recipe.id && imageData?.id) {
      const imageDeleted = await handleImageDelete(
        recipe.id,
        imageData.id,
        toast,
      );
      if (imageDeleted) {
        const recipeDeleted = await handleRecipeDelete(
          recipe.id,
          toast,
          router,
          () => deleteRecipe(recipe.id),
        );
        if (!recipeDeleted) {
          toast({
            variant: "destructive",
            title: "Fehler",
            description: "Rezept konnte nicht gelöscht werden.",
          });
        }
      }
    }
  };

  // render the card
  return (
    <div
      className={
        showDetail
          ? "mx-0 my-4 cursor-pointer rounded-lg bg-sfwhite-light p-3 shadow-lg hover:drop-shadow-lg min-[640px]:mr-2 last:min-[640px]:mr-0"
          : "cursor-pointer!important mx-2 my-4 min-h-[21rem] w-80 rounded-lg bg-sfwhite-light p-3 shadow-lg first:ml-0 hover:drop-shadow-lg max-[640px]:mb-8 min-[640px]:min-h-[26rem]"
      }
    >
      <div className="min-[640px]:min-w-70 min-[1024px]:min-w-90 relative aspect-square min-w-56">
        {/* bookmark */}
        {showBookmark && onBookmarkClick && (
          <BookmarkButton
            onClick={onBookmarkClick}
            recipeId={recipe.id.toString()}
            data-testid="bookmark"
          />
        )}
        {/* image */}
        <Image
          className="pointer-events-none h-full w-full rounded-lg object-cover object-center"
          src={imageData?.file_path || recipe.imageSrc || ""}
          alt={imageData?.alt_text || recipe.imageAlt || recipe.title}
          width={500}
          height={300}
          priority={priority}
        />
      </div>
      {/* title */}
      <div className="h-fit py-3 min-[500px]:h-20">
        <Typography
          variant="heading3"
          className="line-clamp-2 overflow-hidden text-wrap font-cordaMedium font-semibold leading-7 text-sfblack min-[640px]:leading-10"
        >
          {recipe.title}
        </Typography>
      </div>
      {/* detail */}
      {showDetail && (
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2">
            <FaRegClock size={20} />
            <p className="text-sfblack">{recipe.prep_time} Minuten</p>
          </div>
          <div className="flex gap-1">
            {seasonColors.map((color, index) => (
              <Heart
                data-testid="heart"
                width={42}
                height={36}
                key={index}
                color={color}
              />
            ))}
          </div>
        </div>
      )}
      {/* edit and delete functions */}
      {showEdit && (
        <div className="mt-4 flex justify-between border-t-2 border-sfblack pt-2">
          {/* delete */}
          <Button
            size={ButtonSize.XS}
            style={ButtonStyle.OUTLINERED}
            label="löschen"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toast({
                variant: "destructive",
                title: "Rezept löschen",
                description: "Möchtest du dieses Rezept wirklich löschen?",
                action: (
                  <ToastAction
                    onClick={handleDelete}
                    altText="Rezept löschen bestätigen"
                  >
                    Löschen
                  </ToastAction>
                ),
              });
            }}
          />
          {/* edit */}
          <Button
            size={ButtonSize.XS}
            label="bearbeiten"
            onClick={onEditClick}
          />
        </div>
      )}
    </div>
  );
}
