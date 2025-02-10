"use client";

import { Button } from "@/components/button/button";
import { getSeasonColor, translateSeason } from "@/utils/SeasonUtils";
import { RecipeHeader } from "@/components/recipe-header/recipe-header";
import { RecipeInfo } from "@/components/recipe-info/recipe-info";
import { RecipeInstructions } from "@/components/recipe-instructions/recipe-instructions";
import { SessionLoader } from "../auth-session/auth-session";
import { useEffect } from "react";
import { useRecipes } from "@/hooks/use-recipes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import foodImage from "@/assets/images/food-image.jpg";
import Heart from "@/components/ui/heart";
import ImageContainer from "@/components/ui/image-container";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { RecipeData } from "@/types/interfaces";
import { ButtonSize, ButtonStyle } from "@/utils/enum";

interface User {
  username: string;
  id: number;
}

interface RecipePageClientProps {
  recipeDetails: RecipeData;
  user: User;
  seasonTags: string;
  seasonArray: string[];
  recipeId: number;
}

/*
  @desc recipe detail page client
*/
export function RecipePageClient({
  recipeDetails,
  user,
  seasonTags,
  seasonArray,
  recipeId,
}: RecipePageClientProps) {
  const { recipes, setRecipes } = useRecipes();
  const router = useRouter();
  const { status } = useSession();
  const currentRecipe = recipes.find((r) => r.id === recipeId);

  const displayRecipe = currentRecipe || recipeDetails;

  // set the recipe
  useEffect(() => {
    if (!currentRecipe) {
      setRecipes([
        {
          ...recipeDetails,
          season: seasonArray as unknown as number[],
        },
      ]);
    }
  }, [recipeDetails, setRecipes, seasonArray, currentRecipe]);

  // handle season click
  const handleSeasonClick = (season: string) => {
    const params = new URLSearchParams();
    params.set("season", season);
    router.push(`/recipes?${params.toString()}`);
  };

  // if the status is loading or the recipe details are not available, return the session loader
  if (status === "loading" || !recipeDetails) {
    return <SessionLoader />;
  }

  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      {/* recipe header */}
      <RecipeHeader
        title={displayRecipe.title}
        username={user.username}
        recipe={displayRecipe}
      />

      {/* recipe image */}
      <ImageContainer
        recipeId={recipeId}
        fallbackSrc={foodImage}
        alt={`Rezept Titelbild, ${displayRecipe.title}`}
        width={500}
        height={300}
      />

      {/* recipe seasons */}
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
              onClick={() => handleSeasonClick(season)}
            />
          );
        })}
      </div>

      {/* recipe info */}
      <div className="custom-grid items-left flex flex-col min-[640px]:grid min-[640px]:grid-cols-[auto_1fr] min-[640px]:items-start min-[640px]:gap-8">
        <RecipeInfo {...displayRecipe} season={seasonTags} />
        <RecipeInstructions steps={displayRecipe.steps} />
      </div>

      {/* scroll button */}
      <ScrollButton />
    </div>
  );
}
