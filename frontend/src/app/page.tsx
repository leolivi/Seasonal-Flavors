import { authConfig } from "@/auth";
import { CardSliderWrapper } from "@/components/card-slider/card-slider-wrapper";
import { getCurrentSeason } from "@/utils/SeasonUtils";
import { getRecipeImage } from "@/services/image/imageService";
import { getRecipeTags } from "@/services/tag/tagService";
import { getSeasonalRecipes, Recipe } from "@/services/recipe/recipeService";
import { getServerSession } from "next-auth";
import { InspirationText } from "@/components/inspiration-text/inspiration-text";
import { RegisterBanner } from "@/components/banner/register-banner";
import Image from "next/image";
import registerImage from "@/assets/images/register-image.jpg";
import ScrollButton from "@/components/scroll-button/scroll-button";
import Teaser from "@/components/teaser/teaser";

/*
  @desc Displays the home page
*/
const Home = async () => {
  // retrieve the current season
  const seasonName = getCurrentSeason();
  // retrieve the seasonal recipes
  const cardData = await getSeasonalRecipes();
  // retrieve the session
  const session = await getServerSession(authConfig);

  // format the card data
  const formattedCardData: Recipe[] = await Promise.all(
    cardData.map(async (recipe: Recipe) => {
      const imageData = await getRecipeImage(recipe.id);
      const seasonData = await getRecipeTags(recipe.id);

      return {
        ...recipe,
        imageSrc: imageData?.file_path,
        imageAlt: imageData?.alt_text,
        season: Array.isArray(seasonData)
          ? seasonData.map((tag) => tag.name).join(", ")
          : "",
      };
    }),
  );

  // return the home page
  return (
    <main>
      {/* teaser with logo animation */}
      <Teaser />
      {/* inspiration text  */}
      <InspirationText
        seasonName={seasonName}
        aria-label={`Inspirationen für den ${seasonName}`}
      />
      {/* card slider with seasonal recipes */}
      <CardSliderWrapper cardData={formattedCardData} />
      {/* register banner if no user is logged in */}
      {!session && (
        <div className="relative my-24 flex h-[20rem] items-center justify-center px-4 min-[640px]:h-80 min-[640px]:px-8 min-[1024px]:h-96">
          <Image
            className="h-full w-full rounded-lg object-cover"
            src={registerImage}
            alt="Leckeres Essen"
            width={2000}
            height={2000}
            aria-hidden="true"
          />
          <div className="absolute flex w-5/6 items-center justify-center">
            <RegisterBanner label="jetzt registrieren" />
          </div>
        </div>
      )}
      <ScrollButton />
    </main>
  );
};

export default Home;
