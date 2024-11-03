"use client";

import { Button } from "../button/button";
import { Typography } from "../ui/typography";
import { useRouter } from "next/navigation";
import { getSeasonColor } from "@/utils/SeasonUtils";

//  Component to display The register Banner
export const RegisterBanner = () => {
  const seasonalColor = getSeasonColor();

  const router = useRouter();

  // Function to handle button click, navigating to the login page
  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div
      data-testid="register-banner"
      className={`w-fit cursor-pointer rounded-lg border-4 bg-${seasonalColor}-dark/80 border-${seasonalColor}-dark flex flex-col items-center px-12 py-2 pt-10 max-[380px]:px-4`}
    >
      <Typography variant="body">
        <p className="text-center font-figtreeRegular text-sfwhite">
          erstelle eigene <br /> saisonale Rezepte!
        </p>
      </Typography>

      <Button label="jetzt registrieren" onClick={handleClick} />
    </div>
  );
};
