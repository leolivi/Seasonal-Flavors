import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Link from "next/link";
import CreateRecipeFormWrapper from "@/components/create-recipe-form-wrapper/create-recipe-form-wrapper";
import { getCurrentUser } from "@/services/user/userService";
import { getTags } from "@/services/recipe/tagService";
import { notFound } from "next/navigation";
import { translateSeason } from "@/utils/SeasonUtils";

export default async function CreateRecipe() {
  const [user, tags] = await Promise.all([getCurrentUser(), getTags()]);

  if (!user) {
    return notFound();
  }

  const translatedTags = tags.map((tag: { id: number; name: string }) => ({
    ...tag,
    name: translateSeason(tag.name),
  }));

  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      <ScrollButton />
      <div className="mt-8 w-fit cursor-pointer">
        <Link href={"/my-recipes"}>
          <button aria-label="Go back">
            {" "}
            <ArrowLeft />
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>Rezept erstellen</h1>
        </Typography>
      </div>
      <div className="flex justify-center">
        <CreateRecipeFormWrapper user={user} tags={translatedTags} />
      </div>
    </div>
  );
}
