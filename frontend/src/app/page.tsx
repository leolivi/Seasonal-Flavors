import Teaser from "@/components/teaser/teaser";
import { RegisterBanner } from "@/components/banner/register-banner";
import registerImage from "../assets/images/register-image.jpg";
import Image from "next/image";
import ScrollButton from "@/components/scroll-button/scroll-button";
import { dataFetch } from "@/lib/data-fetch";
import { InspirationText } from "@/components/inspiration-text/inspiration-text";
import { CardSliderWrapper } from "@/components/card-slider/card-slider-wrapper";
import { getCurrentSeason } from "@/utils/SeasonUtils";

interface Recipe {
  id: number;
  title: string;
  prep_time: number;
}

interface SeasonTag {
  name: string;
}

// Home component that renders the main content of the page
const Home = async () => {
  const seasonName = getCurrentSeason();
  const cardData = await dataFetch(
    `${process.env.BACKEND_URL}/api/recipe?tags[]=all_year&tags[]=${seasonName}`,
  );

  // Format the card data to match the expected structure
  const formattedCardData = await Promise.all(
    cardData.map(async (recipe: Recipe) => {
      const imageData = await dataFetch(
        `${process.env.BACKEND_URL}/api/images?recipe_id=${recipe.id}`,
      );
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
          width={500}
          height={300}
        />
        <div className="absolute flex items-center justify-center">
          <RegisterBanner label="jetzt registrieren" />
        </div>
      </div>
    </main>
  );
};

export default Home;
