import Image from "next/image";
import { Typography } from "../ui/typography";
import Clock from "../../assets/icons/clock.svg";
import Heart from "../ui/heart";
import { getSeasonColor } from "@/utils/SeasonUtils";
import BookmarkButton from "../ui/bookmark";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { handleRecipeDelete } from "@/services/recipe/recipeDelete";
import { handleImageDelete } from "@/services/image/imageDelete";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Recipe } from "@/services/recipe/recipeService";

interface ExtendedRecipeProps extends Recipe {
  showDetail?: boolean;
  showBookmark?: boolean;
  showEdit?: boolean;
  onBookmarkClick?: (e: React.MouseEvent) => void;
  onEditClick?: (e: React.MouseEvent) => void;
}

export default function Card({
  showDetail = false,
  showBookmark = false,
  showEdit = false,
  onBookmarkClick = () => {},
  onEditClick = () => {},
  ...props
}: ExtendedRecipeProps) {
  const seasonColors = props.season
    ? props.season.split(",").map((s) => getSeasonColor(s.trim()))
    : [];

  const router = useRouter();
  const { toast } = useToast();

  const deleteRecipe = async () => {
    if (props.id) {
      await handleImageDelete(props.id, props.image_id, toast);
    }

    await handleRecipeDelete(props.id, toast, router);
  };

  return (
    <div
      className={
        showDetail
          ? "mx-0 my-4 cursor-pointer rounded-lg bg-sfwhite-light p-3 shadow-lg hover:drop-shadow-lg min-[640px]:mx-2"
          : "cursor-pointer!important mx-2 my-4 min-h-[21rem] w-80 rounded-lg bg-sfwhite-light p-3 shadow-lg first:ml-0 hover:drop-shadow-lg max-[640px]:mb-8 min-[640px]:min-h-[26rem]"
      }
    >
      <div className="min-[640px]:min-w-70 min-[1024px]:min-w-90 relative aspect-square min-w-56">
        {showBookmark && (
          <BookmarkButton onClick={onBookmarkClick} data-testid="bookmark" />
        )}
        <Image
          className="pointer-events-none h-full w-full rounded-lg object-cover"
          src={props.imageSrc || ""}
          alt={props.imageAlt || props.title}
          width={500}
          height={300}
        />
      </div>
      <div className="py-3 min-[640px]:min-h-24">
        <Typography
          variant={showDetail ? "heading3" : "body"}
          className="text-wrap font-cordaMedium text-2xl font-semibold text-sfblack"
        >
          {props.title}
        </Typography>
      </div>
      {showDetail && (
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-2">
            <Clock data-testid="clock" />
            <p className="text-sfblack">{props.prep_time} Min. aktiv</p>
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
            onClick={deleteRecipe}
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
