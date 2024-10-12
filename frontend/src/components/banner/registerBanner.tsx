import { Season } from "@/utils/Season";
import { Button } from "../button/button";
import Link from "next/link";
import { Typography } from "../ui/typography";

export const RegisterBanner = () => {
  const season = new Season();
  const seasonalColor = season.getColor();

  const buttonText = "jetzt registrieren";

  return (
    <div
      color={seasonalColor}
      className={`w-fit cursor-pointer rounded-lg border-4 bg-${seasonalColor}-dark/80 border-${seasonalColor}-dark flex flex-col items-center px-12 py-2 pt-10`}
    >
      <Typography variant="body">
        <p className="text-center font-figtreeRegular text-sfwhite">
          erstelle eigene <br /> saisonale Rezepte!
        </p>
      </Typography>

      <Link href={"/login"}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  );
};
