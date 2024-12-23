import { getRecipeDetail } from "@/services/recipe/recipeDetail";
import { getCurrentUser } from "@/services/user/userService";
import { getTags } from "@/services/tag/tagService";
import { notFound } from "next/navigation";
import CreateRecipeFormWrapper from "@/components/create-recipe-form-wrapper/create-recipe-form-wrapper";
import { Typography } from "@/components/ui/typography";
import ScrollButton from "@/components/scroll-button/scroll-button";
import Link from "next/link";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { getCurrentImage } from "@/services/image/imageService";

export default async function EditRecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipeId = parseInt(params.id);

  const [recipe, user, tags, imageData] = await Promise.all([
    getRecipeDetail(recipeId),
    getCurrentUser(),
    getTags(),
    getCurrentImage(recipeId),
  ]);

  if (!recipe || !user || user.id !== recipe.user_id) {
    return notFound();
  }

  console.log("Fetched image data:", imageData);

  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      <ScrollButton />
      <Link href="/my-recipes">
        <button aria-label="Go back" className="mt-8 w-fit cursor-pointer">
          <ArrowLeft />
        </button>
      </Link>
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          Rezept bearbeiten
        </Typography>
      </div>
      <div className="flex justify-center">
        <CreateRecipeFormWrapper
          recipeData={recipe}
          tags={tags}
          user={user}
          imageData={imageData}
        />
      </div>
    </div>
  );
}
