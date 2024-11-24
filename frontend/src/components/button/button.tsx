import React from "react";
import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";

export enum ButtonStyle {
  PRIMARY = "primary",
  OUTLINE = "outline",
  OUTLINERED = "outline-red",
  SIMPLE = "simple",
  SIMPLERED = "simple-red",
}

export enum ButtonSize {
  SMALL = "small",
  LARGE = "large",
  XS = "xs",
}

interface ButtonProps {
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: ButtonStyle;
  size?: ButtonSize;
  recipeSeasonColor?: string;
  type?: "submit" | "button";
}

export const Button: React.FC<ButtonProps> = ({
  label,
  iconLeft,
  iconRight,
  onClick,
  style = ButtonStyle.PRIMARY,
  size = ButtonSize.LARGE,
  recipeSeasonColor,
  type = "button",
}) => {
  const seasonalColor = getSeasonColor();

  const baseStyles =
    "flex w-fit items-center justify-center gap-1 rounded-full hover:drop-shadow-lg";

  const styleClasses = {
    [ButtonStyle.PRIMARY]: `my-10 px-10 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light cursor-pointer`,
    [ButtonStyle.OUTLINE]: `my-10 border-2 px-4 text-sfblack border-${recipeSeasonColor} bg-sfwhite cursor-default`,
    [ButtonStyle.OUTLINERED]: `my-10 border-2 px-4 text-sfblack border-sfred bg-sfwhite cursor-pointer`,
    [ButtonStyle.SIMPLE]: `text-sfblack cursor-pointer`,
    [ButtonStyle.SIMPLERED]: `text-sfred-dark cursor-pointer`,
  };

  const sizeClasses = {
    [ButtonSize.SMALL]: "btnL",
    [ButtonSize.XS]: "small",
    [ButtonSize.LARGE]: "btnS",
  };

  const typographyVariant =
    size === ButtonSize.LARGE
      ? "btnL"
      : size === ButtonSize.SMALL
        ? "btnS"
        : "small";

  return (
    <button
      className={`${baseStyles} ${styleClasses[style]} ${sizeClasses[size]}`}
      type={type}
      onClick={onClick}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <Typography variant={typographyVariant} className="font-figtreeRegular">
        {label}
      </Typography>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};
