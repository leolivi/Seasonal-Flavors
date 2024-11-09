import { Button, ButtonStyle } from "@/components/button/button";
import ScrollButton from "@/components/scroll-button/scroll-button";
import ImageContainer from "@/components/ui/image-container";
import dataFetch from "@/utils/data-fetch";
import { RecipeHeader } from "@/components/recipe-header/recipe-header";
import { RecipeInfo } from "@/components/recipe-info/recipe-info";
import { RecipeInstructions } from "@/components/recipe-instructions/recipe-instructions";
import Heart from "@/components/ui/heart";
import { getSeasonColor, translateSeason } from "@/utils/SeasonUtils";

interface RecipeData {
  id: number;
  title: string;
  cooking_time: number;
  prep_time: number;
  servings: number;
  steps: string;
  ingredients: string;
  user_id: string;
  imageSrc?: string;
  imageAlt?: string;
  season?: string;
}

interface SeasonTag {
  name: string;
}

interface UserData {
  username: string;
  id: number;
}

export default async function Recipe({ params }: { params: { id: number } }) {
  // Fetch the recipe data and related information
  const recipeId = params.id;

  const recipeData = await dataFetch(
    `${process.env.BACKEND_URL}/api/recipe?id=${recipeId}`,
  );
  const recipe: RecipeData = Array.isArray(recipeData)
    ? recipeData[0]
    : recipeData;

  // Fetch the image data
  const imageData = await dataFetch(
    `${process.env.BACKEND_URL}/api/images?recipe_id=${recipeId}`,
  );
  const firstImage = imageData[0] || {};

  // Fetch season data
  const seasonData = await dataFetch(
    `${process.env.BACKEND_URL}/api/recipes/${recipeId}/tags`,
  );
  const seasonTags = seasonData.map((tag: SeasonTag) => tag.name).join(", ");

  // fetch user data
  const userData: UserData = await dataFetch(
    `${process.env.BACKEND_URL}/api/user/${recipe.user_id}`,
  );

  const formattedRecipeData: RecipeData = {
    ...recipe,
    imageSrc: firstImage.file_path || "",
    imageAlt: firstImage.alt_text || recipe.title,
    season: seasonTags,
  };

  const seasonArray = seasonTags
    .split(",")
    .map((season: string) => season.trim());

  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      <ScrollButton />
      <RecipeHeader
        title={formattedRecipeData.title}
        username={userData.username}
      />
      <ImageContainer
        src={
          formattedRecipeData.imageSrc || "/src/assets/images/food-image.jpg"
        }
        alt={`Rezept Titelbild, ${formattedRecipeData.imageAlt}`}
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
              iconLeft={<Heart color={seasonalColor} height={20} />}
              recipeSeasonColor={seasonalColor}
            />
          );
        })}
      </div>
      <div className="custom-grid min-[640px]:gap-8flex items-left flex flex-col min-[640px]:grid min-[640px]:grid-cols-[auto_1fr] min-[640px]:items-start min-[640px]:gap-8">
        <RecipeInfo
          prepTime={formattedRecipeData.prep_time}
          cookingTime={formattedRecipeData.cooking_time}
          servings={formattedRecipeData.servings}
          ingredients={formattedRecipeData.ingredients}
        />
        <RecipeInstructions steps={formattedRecipeData.steps} />
      </div>
    </div>
  );
}
