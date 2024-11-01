import Teaser from "@/components/teaser/teaser";
import { Season } from "@/utils/Season";
import { RegisterBanner } from "@/components/banner/register-banner";
import registerImage from "../assets/images/register-image.jpg";
import Image from "next/image";
import ScrollButton from "@/components/scroll-button/scroll-button";
import dataFetch from "@/utils/data-fetch";
import { InspirationText } from "@/components/inspiration-text/inspiration-text";
import { CardSliderWrapper } from "@/components/card-slider/card-slider-wrapper";

// Home component that renders the main content of the page
const Home = async () => {
  const seasonName = Season.getSeason();
  const cardData = await dataFetch(
    // `http://127.0.0.1:8000/api/recipe?tags[]=${seasonName}`,
    `http://127.0.0.1:8000/api/recipe`,
  );

  // Format the card data to match the expected structure
  const formattedCardData = await Promise.all(
    cardData.map(async (recipe: any) => {
      const imageData = await dataFetch(
        `http://127.0.0.1:8000/api/images?recipe_id=${recipe.id}`,
      );
      const seasonData = await dataFetch(
        `http://127.0.0.1:8000/api/recipes/${recipe.id}/tags`,
      );

      const firstImage = imageData[0] || {};

      const seasonTags = seasonData.map((tag: any) => tag.name).join(", ");

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

  console.log("Filtered Recipes for Season:", seasonName, formattedCardData);

  return (
    <main>
      <ScrollButton />
      <Teaser />
      <InspirationText seasonName={seasonName} />
      {/* Pass the fetched data as props */}
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
          <RegisterBanner />
        </div>
      </div>
    </main>
  );
};

export default Home;
