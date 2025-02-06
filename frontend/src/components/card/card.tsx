import Image from "next/image";
import { Typography } from "../ui/typography";
import { FaRegClock } from "react-icons/fa6";
import Heart from "../ui/heart";
import { getSeasonColor } from "@/utils/SeasonUtils";
import BookmarkButton from "../ui/bookmark";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Recipe } from "@/services/recipe/recipeService";
import { ImageData, getRecipeImage } from "@/services/image/imageService";
import { useEffect, useState } from "react";
import { ToastAction } from "@radix-ui/react-toast";
import { UserData } from "@/services/user/userService";
import { handleImageDelete } from "@/services/image/imageDelete";
import { handleRecipeDelete } from "@/services/recipe/recipeDelete";
import { useRecipes } from "@/hooks/use-recipes";

interface ExtendedRecipeProps extends Recipe {
  showDetail?: boolean;
  showBookmark?: boolean;
  showEdit?: boolean;
  onBookmarkClick?: (e: React.MouseEvent) => void;
  onEditClick?: (e: React.MouseEvent) => void;
  imageData?: ImageData;
  priority?: boolean;
  user?: UserData;
}

export default function Card({
  showDetail = false,
  showBookmark = false,
  showEdit = false,
  onBookmarkClick = () => {},
  onEditClick = () => {},
  ...props
}: ExtendedRecipeProps) {
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const router = useRouter();
  const { toast } = useToast();
  const {
    recipes,
    setRecipes,
    deleteRecipe: deleteRecipeFromHook,
  } = useRecipes();

  useEffect(() => {
    const fetchImageData = async () => {
      if (props.id) {
        const fetchedImageData = await getRecipeImage(props.id);
        setImageData(fetchedImageData);
      }
    };

    fetchImageData();
  }, [props.id]);

  const seasonColors =
    props.season && typeof props.season === "string"
      ? props.season
          .split(",")
          .map((season: string) => getSeasonColor(season.trim()))
      : [];

  const handleDelete = async () => {
    if (props.id && imageData?.id) {
      const imageDeleted = await handleImageDelete(
        props.id,
        imageData.id,
        toast,
      );

      if (imageDeleted === true) {
        const recipeDeleted = await handleRecipeDelete(
          props.id,
          toast,
          router,
          deleteRecipeFromHook,
        );

        if (recipeDeleted) {
          const updatedRecipes = recipes.filter(
            (recipe) => recipe.id !== props.id,
          );
          setRecipes(updatedRecipes);
          // router.refresh();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Bild konnte nicht gelöscht werden.",
        });
      }
    }
  };

  return (
    <div
      className={
        showDetail
          ? "mx-0 my-4 cursor-pointer rounded-lg bg-sfwhite-light p-3 shadow-lg hover:drop-shadow-lg min-[640px]:mr-2 last:min-[640px]:mr-0"
          : "cursor-pointer!important mx-2 my-4 min-h-[21rem] w-80 rounded-lg bg-sfwhite-light p-3 shadow-lg first:ml-0 hover:drop-shadow-lg max-[640px]:mb-8 min-[640px]:min-h-[26rem]"
      }
    >
      <div className="min-[640px]:min-w-70 min-[1024px]:min-w-90 relative aspect-square min-w-56">
        {showBookmark && (
          <BookmarkButton
            onClick={onBookmarkClick}
            recipeId={props.id.toString()}
            data-testid="bookmark"
          />
        )}
        <Image
          className="pointer-events-none h-full w-full rounded-lg object-cover object-center"
          src={imageData?.file_path || props.imageSrc || ""}
          alt={imageData?.alt_text || props.imageAlt || props.title}
          width={500}
          height={300}
          priority={props.priority}
        />
      </div>
      <div className="h-fit py-3 min-[500px]:h-20">
        <Typography
          variant={"heading3"}
          className="line-clamp-2 overflow-hidden text-wrap font-cordaMedium font-semibold leading-7 text-sfblack min-[640px]:leading-10"
        >
          {props.title}
        </Typography>
      </div>

      {showDetail && (
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2">
            <FaRegClock size={20} />
            <p className="text-sfblack">{props.prep_time} Minuten</p>
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
      {showEdit && (
        <div className="mt-4 flex justify-between border-t-2 border-sfblack pt-2">
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
