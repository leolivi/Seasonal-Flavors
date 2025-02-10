import { getAuthenticatedUser } from "@/utils/auth-user";
import { getRecipeDetail } from "@/utils/recipeDetail";
import { getRecipeImage } from "@/services/image/imageService";
import { getTags } from "@/services/tag/tagService";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { notFound } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import RecipeFormWrapper from "@/components/recipe-form-wrapper/recipe-form-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";

/*
  @desc Displays the edit recipe page
*/
export default async function EditRecipePage({
  params,
}: {
  params: { id: string };
}) {
  // retrieve the recipe id
  const recipeId = parseInt(params.id);

  // retrieve the recipe, user, tags and image data
  const [recipe, user, tags, imageData] = await Promise.all([
    getRecipeDetail(recipeId),
    getAuthenticatedUser(),
    getTags(),
    getRecipeImage(recipeId),
  ]);

  // if there is no recipe or user, return null
  if (!recipe || !user) {
    return notFound();
  }

  // return the edit recipe page
  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      {/* go back button */}
      <div className="mt-8 w-fit cursor-pointer">
        <Link href="/my-recipes">
          <button aria-label="Go back">
            <HiOutlineArrowLeft
              size={25}
              className="stroke-2 text-sfblack"
              data-testid="arrow-left"
            />
          </button>
        </Link>
      </div>
      {/* heading */}
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1 aria-label="Rezept bearbeiten" tabIndex={0}>
            Rezept bearbeiten
          </h1>
        </Typography>
      </div>
      {/* recipe form wrapper */}
      <div className="flex justify-center">
        <RecipeFormWrapper
          recipeData={recipe}
          tags={tags}
          user={user}
          imageData={imageData}
        />
      </div>
      {/* scroll button */}
      <ScrollButton />
    </div>
  );
}
