import ScrollButton from "@/components/scroll-button/scroll-button";
import { Typography } from "@/components/ui/typography";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import CreateRecipeForm from "@/components/forms/create-recipe-form";
import Link from "next/link";

export default function CreateRecipe() {
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
      <CreateRecipeForm />
    </div>
  );
}
