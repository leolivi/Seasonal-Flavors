import { Button, ButtonSize, ButtonStyle } from "@/components/button/button";
import ScrollButton from "@/components/scroll-button/scroll-button";
import ImageContainer from "@/components/ui/image-container";
import { RecipeHeader } from "@/components/recipe-header/recipe-header";
import { RecipeInfo } from "@/components/recipe-info/recipe-info";
import { RecipeInstructions } from "@/components/recipe-instructions/recipe-instructions";
import Heart from "@/components/ui/heart";
import { getSeasonColor, translateSeason } from "@/utils/SeasonUtils";
import foodImage from "@/assets/images/food-image.jpg";
import { getRecipeDetail } from "@/utils/recipeDetail";
import { getRecipeTags, TagData } from "@/services/tag/tagService";
import { getAuthenticatedUser } from "@/utils/auth-user";

export default async function Recipe({ params }: { params: { id: number } }) {
  const user = await getAuthenticatedUser();
  if (!user) return null;

  const recipeId = params.id;

  const recipeDetails = await getRecipeDetail(recipeId);
  if (!recipeDetails) return null;

  const seasonData = await getRecipeTags(recipeDetails.id);

  const seasonTags = recipeDetails.season
    .map((tagId: number) => {
      const tag = seasonData.find((t: TagData) => t.id === tagId);
      return tag ? tag.name : "";
    })
    .filter(Boolean)
    .join(", ");

  const seasonArray = seasonTags
    .split(",")
    .map((season: string) => season.trim());

  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      <ScrollButton />
      <RecipeHeader
        title={recipeDetails.title}
        username={user.username}
        recipe={recipeDetails}
      />
      <ImageContainer
        src={recipeDetails.imageSrc || foodImage}
        alt={`Rezept Titelbild, ${recipeDetails.imageAlt}`}
        width={500}
        height={300}
      />
      <div className="flex justify-center gap-2">
        {seasonArray.map((season: string, index: number) => {
          const seasonalColor = getSeasonColor(season);
          const translatedSeason = translateSeason(season);
          return (
            <Button
              key={index}
              label={translatedSeason}
              style={ButtonStyle.OUTLINE}
              size={ButtonSize.SMALL}
              iconLeft={<Heart color={seasonalColor} height={18} width={25} />}
              recipeSeasonColor={seasonalColor}
            />
          );
        })}
      </div>
      <div className="custom-grid min-[640px]:gap-8flex items-left flex flex-col min-[640px]:grid min-[640px]:grid-cols-[auto_1fr] min-[640px]:items-start min-[640px]:gap-8">
        <RecipeInfo {...recipeDetails} season={seasonTags} />
        <RecipeInstructions steps={recipeDetails.steps} />
      </div>
    </div>
  );
}
