import { getRecipeDetail } from "@/utils/recipeDetail";
import { getAuthenticatedUser } from "@/utils/auth-user";
import { getTags } from "@/services/tag/tagService";
import { notFound } from "next/navigation";
import RecipeFormWrapper from "@/components/recipe-form-wrapper/recipe-form-wrapper";
import { Typography } from "@/components/ui/typography";
import ScrollButton from "@/components/scroll-button/scroll-button";
import Link from "next/link";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { getRecipeImage } from "@/services/image/imageService";

export default async function EditRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipeId = parseInt(params.id);

  const [recipe, user, tags, imageData] = await Promise.all([
    getRecipeDetail(recipeId),
    getAuthenticatedUser(),
    getTags(),
    getRecipeImage(recipeId),
  ]);

  if (!recipe || !user) {
    return notFound();
  }

  console.log("Fetched image data:", imageData);

  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      <ScrollButton />
      <div className="mt-8 w-fit cursor-pointer">
        <Link href="/my-recipes">
          <button aria-label="Go back">
            <ArrowLeft />
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>Rezept bearbeiten</h1>
        </Typography>
      </div>
      <div className="flex justify-center">
        <RecipeFormWrapper
          recipeData={recipe}
          tags={tags}
          user={user}
          imageData={imageData}
        />
      </div>
    </div>
  );
}
