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
  dataTestId?: string;
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
  dataTestId,
}) => {
  const seasonalColor = getSeasonColor();

  const baseStyles =
    "flex w-fit items-center justify-center gap-1 rounded-full hover:drop-shadow-lg";

  const styleClasses = {
    [ButtonStyle.PRIMARY]: `px-4 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light cursor-pointer`,
    [ButtonStyle.OUTLINE]: `my-2 px-4 py-2 text-sfblack border-2 border-${recipeSeasonColor}-light bg-sfwhite`,
    [ButtonStyle.OUTLINERED]: `my-2 border-2 px-4 py-2 text-sfblack border-sfred bg-sfwhite cursor-pointer`,
    [ButtonStyle.SIMPLE]: `text-sfblack cursor-pointer`,
    [ButtonStyle.SIMPLERED]: `text-sfred-dark cursor-pointer`,
  };

  const sizeClasses = {
    [ButtonSize.SMALL]: "text-sm my-6 px-4 py-3",
    [ButtonSize.XS]: "text-xs my-2 px-2 py-1",
    [ButtonSize.LARGE]: "text-lg px-6 py-3 my-10",
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
      data-testid={dataTestId}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <Typography variant={typographyVariant} className="font-figtreeRegular">
        {label}
      </Typography>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};
