"use client";

import { Button, ButtonSize, ButtonStyle } from "@/components/button/button";
import ScrollButton from "@/components/scroll-button/scroll-button";
import ImageContainer from "@/components/ui/image-container";
import { RecipeHeader } from "@/components/recipe-header/recipe-header";
import { RecipeInfo } from "@/components/recipe-info/recipe-info";
import { RecipeInstructions } from "@/components/recipe-instructions/recipe-instructions";
import Heart from "@/components/ui/heart";
import { getSeasonColor, translateSeason } from "@/utils/SeasonUtils";
import foodImage from "@/assets/images/food-image.jpg";
import { Recipe } from "@/services/recipe/recipeService";
import { useEffect } from "react";
import { useRecipesStore } from "@/stores/useRecipesStore";

interface User {
  username: string;
  id: number;
}

interface RecipePageClientProps {
  recipeDetails: Recipe;
  user: User;
  seasonTags: string;
  seasonArray: string[];
  recipeId: number;
}

export function RecipePageClient({
  recipeDetails,
  user,
  seasonTags,
  seasonArray,
  recipeId,
}: RecipePageClientProps) {
  const { updateRecipe } = useRecipesStore();

  const storeRecipe = useRecipesStore((state) =>
    state.recipes.find((r) => r.id === recipeId),
  );

  const displayRecipe = storeRecipe || recipeDetails;

  useEffect(() => {
    if (
      !storeRecipe ||
      JSON.stringify(storeRecipe) !== JSON.stringify(recipeDetails)
    ) {
      updateRecipe({
        ...recipeDetails,
        season: seasonArray as unknown as number[],
      });
    }
  }, [recipeDetails, storeRecipe, updateRecipe, seasonArray]);

  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      <ScrollButton />
      <RecipeHeader
        title={displayRecipe.title}
        username={user.username}
        recipe={displayRecipe}
      />
      <ImageContainer
        recipeId={recipeId}
        fallbackSrc={foodImage}
        alt={`Rezept Titelbild, ${displayRecipe.title}`}
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
      <div className="custom-grid items-left flex flex-col min-[640px]:grid min-[640px]:grid-cols-[auto_1fr] min-[640px]:items-start min-[640px]:gap-8">
        <RecipeInfo {...displayRecipe} season={seasonTags} />
        <RecipeInstructions steps={displayRecipe.steps} />
      </div>
    </div>
  );
}
