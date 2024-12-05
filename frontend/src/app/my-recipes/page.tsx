import CardListWrapper from "@/components/card-list.tsx/card-list-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import { Button, ButtonSize } from "@/components/button/button";
import Arrow from "src/assets/icons/arrow.svg";
import { LayoutOptions } from "@/utils/layout-options";
import { dataFetch, dataFetchWithToken } from "@/utils/data-fetch";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";
import Link from "next/link";

interface Recipe {
  id: number;
  title: string;
  prep_time: number;
}

interface SeasonTag {
  name: string;
}

const MyRecipes = async () => {
  const session = await getServerSession(authConfig);

  if (!session) return;

  // Fetch the current user
  const user = await dataFetchWithToken(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
    session.accessToken,
  );

  // Fetch the recipe data of current user
  const cardData = await dataFetch(
    `${process.env.BACKEND_URL}/api/recipe?user_id=${user.id}`,
  );

  if (!Array.isArray(cardData)) {
    console.error("Expected cardData to be an array, but got:", cardData);
    return;
    // TODO: fehlermeldung für user
  }

  const formattedCardData = await Promise.all(
    // Map through recipe data (cards)
    cardData.map(async (recipe: Recipe) => {
      // Fetch image data
      const imageData = await dataFetch(
        `${process.env.BACKEND_URL}/api/images?recipe_id=${recipe.id}`,
      );
      // Fetch season data
      const seasonData = await dataFetch(
        `${process.env.BACKEND_URL}/api/recipes/${recipe.id}/tags`,
      );

      const firstImage = imageData[0] || {};

      const seasonTags = seasonData
        .map((tag: SeasonTag) => tag.name)
        .join(", ");

      return {
        id: recipe.id,
        imageSrc: firstImage.file_path || "",
        imageAlt: firstImage.alt_text || recipe.title,
        title: recipe.title,
        prepDuration: recipe.prep_time,
        season: seasonTags,
      };
    }),
  );

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

      {formattedCardData.length > 0 ? (
        <>
          <CardListWrapper
            cardData={formattedCardData}
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

export default MyRecipes;
