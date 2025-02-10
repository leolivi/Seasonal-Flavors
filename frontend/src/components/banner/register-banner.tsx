"use client";
import { Button } from "../button/button";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";
import { Typography } from "../ui/typography";
import { useRouter } from "next/navigation";
import useMediaQuery from "@/hooks/use-media-query";
import { ButtonSize } from "@/utils/enum";

interface RegisterBannerProps {
  onClose?: () => void;
  showCloseBtn?: boolean;
  label: string;
  content?: ReactNode;
}

/*
  @desc Displays the register banner
*/
export const RegisterBanner = ({
  onClose,
  showCloseBtn = false,
  label = "jetzt registrieren",
  content = (
    <>
      erstelle eigene
      <br />
      saisonale Rezepte!
    </>
  ),
}: RegisterBannerProps) => {
  const router = useRouter();
  const seasonalColor = getSeasonColor();
  const isDesktop = useMediaQuery("(min-width: 720px)");

  // handle button click, navigating to the login page
  const handleClick = () => {
    if (label === "jetzt registrieren") {
      router.push("/session?form=register");
    } else {
      router.push("/session?form=login");
    }
  };

  // return the register banner
  return (
    <div
      data-testid="register-banner"
      className={`w-fit cursor-pointer rounded-lg border-4 bg-${seasonalColor}-dark/80 border-${seasonalColor}-dark flex flex-col items-center px-20 py-2 pt-10 max-[380px]:px-4`}
    >
      {/* close button */}
      {showCloseBtn && (
        <RxCross2
          size={25}
          onClick={onClose}
          className="absolute right-2 top-2 m-2 w-6 cursor-pointer text-sfwhite"
          aria-label="Close Register Banner"
          data-testid="cross-button"
        />
      )}
      {/* content */}
      <Typography variant="body">
        <p className="text-center font-figtreeRegular text-sfwhite">
          {content}
        </p>
      </Typography>
      {/* register / sign in button */}
      <Button
        label={label}
        onClick={handleClick}
        size={isDesktop ? ButtonSize.LARGE : ButtonSize.SMALL}
      />
    </div>
  );
};
