import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import { Button, ButtonSize } from "@/components/button/button";
import Arrow from "src/assets/icons/arrow.svg";
import { LayoutOptions } from "@/utils/layout-options";
import Link from "next/link";
import { getRecipeDetail } from "@/utils/recipeDetail";
import { getUserRecipes, Recipe } from "@/services/recipe/recipeService";
import { getRecipeTags, TagData } from "@/services/tag/tagService";
import { getAuthenticatedUser } from "@/utils/auth-user";

const MyRecipesPage = async () => {
  const user = await getAuthenticatedUser();
  if (!user) return null;

  // Recipe-Fetch (all recipes of the current user)
  const cardData = await getUserRecipes(user.id);
  if (!cardData) {
    return;
  }

  const formattedCardData = await Promise.all(
    cardData.map(async (recipe: Recipe) => {
      const recipeDetails = await getRecipeDetail(recipe.id);
      if (!recipeDetails) return null;

      const seasonData = await getRecipeTags(recipe.id);

      const seasonTags = recipeDetails.season
        .map((tagId: number) => {
          const tag = seasonData.find((t: TagData) => t.id === tagId);
          return tag ? tag.name : "";
        })
        .filter(Boolean)
        .join(", ");

      return {
        id: recipe.id,
        imageSrc: recipeDetails.imageSrc,
        imageAlt: recipeDetails.imageAlt,
        imageId: recipeDetails.id,
        title: recipe.title,
        prepDuration: recipe.prep_time,
        season: seasonTags,
      };
    }),
  );

  // Filter null values from failed fetches
  const filteredCardData = formattedCardData.filter(Boolean);

  return (
    <div className="m-4">
      <ScrollButton />
      <div className="flex items-center justify-between px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>meine Rezepte</h1>
        </Typography>
        <Link href={"/recipes/create"}>
          <Button label="Rezept erstellen" size={ButtonSize.SMALL} />
        </Link>
      </div>

      {filteredCardData.length > 0 ? (
        <>
          <CardListWrapper
            cardData={filteredCardData.map((item) => ({
              id: item!.id,
              imageSrc: item!.imageSrc,
              imageAlt: item!.imageAlt,
              imageId: item!.imageId || 0,
              title: item!.title,
              prepDuration: item!.prepDuration,
              season: item!.season,
            }))}
            showDetail={true}
            showEdit={true}
            style={LayoutOptions.GRID}
          />
          <div className="flex w-full justify-center">
            <Button
              label="mehr"
              size={ButtonSize.SMALL}
              iconRight={<Arrow />}
            ></Button>
          </div>
        </>
      ) : (
        <div className="flex h-[45vh] w-full flex-col items-center pt-10">
          <Typography variant="heading3">
            <p className="text-sfblack">OOPS!</p>
          </Typography>
          <Typography variant="body">
            <span className="text-sfblack">
              Du hast noch keine eigenen Rezepte erstellt.
            </span>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default MyRecipesPage;
