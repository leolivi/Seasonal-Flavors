import { getAuthenticatedUser } from "@/utils/auth-user";
import { getTags } from "@/services/tag/tagService";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { translateSeason } from "@/utils/SeasonUtils";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import RecipeFormWrapper from "@/components/recipe-form-wrapper/recipe-form-wrapper";
import ScrollButton from "@/components/scroll-button/scroll-button";

/*
  @desc Displays the create recipe page
*/
export default async function CreateRecipePage() {
  // fetch the user and tags
  const results = await Promise.allSettled([getAuthenticatedUser(), getTags()]);
  // Check the results
  const userResult = results[0];
  const tagsResult = results[1];
  // if the user result is rejected, return null
  if (userResult.status === "rejected" || !userResult.value) return null;
  // if the tags result is rejected, return null
  if (tagsResult.status === "rejected" || !tagsResult.value) return null;
  // get the user and tags
  const user = userResult.value;
  const tags = tagsResult.status === "fulfilled" ? tagsResult.value : [];

  // format the tags
  const translatedTags = tags.map((tag: { id: number; name: string }) => ({
    ...tag,
    name: translateSeason(tag.name),
  }));

  // return the create recipe page
  return (
    <div className="px-4 pb-16 pt-8 min-[640px]:p-8 min-[640px]:pb-24">
      {/* go back button */}
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
      {/* heading */}
      <div className="flex items-center justify-center px-2 min-[640px]:px-6">
        <Typography variant="heading2" className="font-figtreeRegular">
          <h1 aria-label="Rezept erstellen" tabIndex={0}>
            Rezept erstellen
          </h1>
        </Typography>
      </div>
      {/* recipe form wrapper */}
      <div className="flex justify-center">
        <RecipeFormWrapper user={user} tags={translatedTags} />
      </div>
      {/* scroll button */}
      <ScrollButton />
    </div>
  );
}
