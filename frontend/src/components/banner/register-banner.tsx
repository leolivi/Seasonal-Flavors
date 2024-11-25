"use client";
import Cross from "@/assets/icons/cross.svg";
import { Button } from "../button/button";
import { Typography } from "../ui/typography";
import { useRouter } from "next/navigation";
import { getSeasonColor } from "@/utils/SeasonUtils";

interface RegisterBannerProps {
  onClose?: () => void;
  showCloseBtn?: boolean;
  label: string;
}

//  Component to display The register Banner
export const RegisterBanner = ({
  onClose,
  showCloseBtn = false,
  label = "jetzt registrieren",
}: RegisterBannerProps) => {
  const router = useRouter();
  const seasonalColor = getSeasonColor();

  // Function to handle button click, navigating to the login page
  const handleClick = () => {
    router.push("/session");
  };

  return (
    <div
      data-testid="register-banner"
      className={`w-fit cursor-pointer rounded-lg border-4 bg-${seasonalColor}-dark/80 border-${seasonalColor}-dark flex flex-col items-center px-20 py-2 pt-10 max-[380px]:px-4`}
    >
      {showCloseBtn && (
        <Cross
          onClick={onClose}
          className="absolute right-2 top-2 m-2 w-6 cursor-pointer stroke-sfwhite stroke-2"
          aria-label="Close Register Banner"
        />
      )}
      <Typography variant="body">
        <p className="text-center font-figtreeRegular text-sfwhite">
          erstelle eigene <br /> saisonale Rezepte!
        </p>
      </Typography>

      <Button label={label} onClick={handleClick} />
    </div>
  );
};
