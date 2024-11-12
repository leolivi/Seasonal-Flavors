"use client";
import { Button } from "../button/button";
import { Typography } from "../ui/typography";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegisterBanner } from "../banner/register-banner";
import { useSession } from "next-auth/react";

interface RecipeHeaderProps {
  title: string;
  username: string;
}

export const RecipeHeader = ({ title, username }: RecipeHeaderProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showRegisterBanner, setShowRegisterBanner] = useState(false);

  const handleBackClick = () => {
    router.back();
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If the user is not authenticated, show the register banner
    if (status === "unauthenticated") {
      setShowRegisterBanner(true);
      // TODO: handle bookmark functionality for authenticated users here
    } else {
      console.log("Bookmark saved!");
    }
  };

  const handleCloseBanner = () => {
    setShowRegisterBanner(false);
  };

  return (
    <div>
      <div className="mt-8 w-fit cursor-pointer">
        <button onClick={handleBackClick} aria-label="Go back">
          <ArrowLeft />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <Typography variant="heading1">
          <h1 className="mt-4 font-cordaBold text-sfblack">{title}</h1>
        </Typography>
        {/* TODO: How do I fetch the userid when unauthenticated? */}
        <Typography variant="body">
          <small className="mt-2 text-sfblack">von {username}</small>
        </Typography>
        {/* TODO: Implement "speichern" Function */}

        <Button
          label="speichern"
          iconLeft={<Bookmark className="h-6 w-auto" />}
          onClick={handleSaveClick}
        />
        {showRegisterBanner && (
          <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2">
            <RegisterBanner
              label="anmelden"
              showCloseBtn={true}
              onClose={handleCloseBanner}
            />
          </div>
        )}
      </div>
    </div>
  );
};
