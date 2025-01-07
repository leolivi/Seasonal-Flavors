import Teaser from "@/components/teaser/teaser";
import { RegisterBanner } from "@/components/banner/register-banner";
import registerImage from "@/assets/images/register-image.jpg";
import Image from "next/image";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { InspirationText } from "@/components/inspiration-text/inspiration-text";
import { CardSliderWrapper } from "@/components/card-slider/card-slider-wrapper";
import { getCurrentSeason } from "@/utils/SeasonUtils";
import { getSeasonalRecipes, Recipe } from "@/services/recipe/recipeService";
import { getRecipeImage } from "@/services/image/imageService";
import { getRecipeTags } from "@/services/tag/tagService";

// Home component that renders the main content of the page
const Home = async () => {
  const seasonName = getCurrentSeason();
  const cardData = await getSeasonalRecipes();

  // Format the card data to match the expected structure
  const formattedCardData: Recipe[] = await Promise.all(
    cardData.map(async (recipe: Recipe) => {
      const imageData = await getRecipeImage(recipe.id);
      const seasonData = await getRecipeTags(recipe.id);

      return {
        ...recipe,
        imageSrc: imageData?.file_path,
        imageAlt: imageData?.alt_text,
        season: seasonData.map((tag) => tag.name).join(", "),
      };
    }),
  );

  return (
    <main>
      <ScrollButton />
      <Teaser />
      <InspirationText seasonName={seasonName} />
      <CardSliderWrapper cardData={formattedCardData} />
      <div className="h-1/8 relative my-24 flex items-center justify-center px-4 min-[640px]:h-80 min-[640px]:px-8 min-[1024px]:h-96">
        <Image
          className="h-full w-full rounded-lg object-cover"
          src={registerImage}
          alt="Leckeres Essen"
          width={2000}
          height={2000}
        />
        <div className="absolute flex items-center justify-center">
          <RegisterBanner label="jetzt registrieren" />
        </div>
      </div>
    </main>
  );
};

export default Home;
