import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import RecipeFormWrapper from "@/components/recipe-form-wrapper/recipe-form-wrapper";
import { getAuthenticatedUser } from "@/utils/auth-user";
import { getTags } from "@/services/tag/tagService";
import { notFound } from "next/navigation";
import { translateSeason } from "@/utils/SeasonUtils";

export default async function CreateRecipePage() {
  const [user, tags] = await Promise.all([getAuthenticatedUser(), getTags()]);

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
            <HiOutlineArrowLeft
              size={25}
              className="stroke-2 text-sfblack"
              data-testid="arrow-left"
            />
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1>Rezept erstellen</h1>
        </Typography>
      </div>
      <div className="flex justify-center">
        <RecipeFormWrapper user={user} tags={translatedTags} />
      </div>
    </div>
  );
}
