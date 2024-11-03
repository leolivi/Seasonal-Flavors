"use client";
import { Button } from "../button/button";
import { Typography } from "../ui/typography";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import Bookmark from "@/assets/icons/bookmark.svg";
import { useRouter } from "next/navigation";

interface RecipeHeaderProps {
  title: string;
  username: string;
}

export const RecipeHeader = ({ title, username }: RecipeHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
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
        <Typography variant="small">
          <small className="mt-2 text-sfblack">von{username}</small>
        </Typography>
        {/* TODO: Implement "speichern" Function */}
        <Button
          label="speichern"
          iconLeft={<Bookmark className="h-6 w-auto" />}
        />
      </div>
    </div>
  );
};
