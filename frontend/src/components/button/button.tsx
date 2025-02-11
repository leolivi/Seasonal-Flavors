import { getSeasonColor } from "@/utils/SeasonUtils";
import { Typography } from "../ui/typography";
import React from "react";
import { ButtonSize, ButtonStyle } from "@/utils/enum";

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

/*
  @desc Displays the button
*/
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
  // get the seasonal color
  const seasonalColor = getSeasonColor();

  // base styles
  const baseStyles =
    "flex w-fit items-center justify-center gap-1 rounded-full hover:drop-shadow-md";

  // style classes
  const styleClasses = {
    [ButtonStyle.PRIMARY]: `px-4 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light cursor-pointer`,
    [ButtonStyle.OUTLINE]: `my-2 px-4 py-2 text-sfblack border-2 border-${recipeSeasonColor}-light bg-sfwhite`,
    [ButtonStyle.OUTLINERED]: `my-2 border-2 px-4 py-2 text-sfblack border-sfred bg-sfwhite cursor-pointer`,
    [ButtonStyle.OUTLINEGREEN]: `my-2 border-2 px-4 py-2 text-sfblack border-sfgreen bg-sfwhite cursor-pointer`,
    [ButtonStyle.SIMPLE]: `text-sfblack max-[400px]:mt-0 cursor-pointer hover:text-${seasonalColor}-dark`,
    [ButtonStyle.SIMPLERED]: `text-sfred-dark  cursor-pointer`,
    [ButtonStyle.UPLOAD]: `text-sfblack my-0 cursor-pointer hover:text-${seasonalColor}-dark bg-${seasonalColor}-light rounded-md mt-2 border-${seasonalColor}-dark border-2 border-${seasonalColor}-dark`,
  };

  // size classes
  const sizeClasses = {
    [ButtonSize.XS]: "text-xs my-2 px-2 py-1",
    [ButtonSize.SMALL]: "text-sm my-6 px-4 py-3",
    [ButtonSize.LARGE]: "text-lg px-6 py-3 my-10",
  };

  // typography variant
  const typographyVariant =
    size === ButtonSize.LARGE
      ? "btnL"
      : size === ButtonSize.SMALL
        ? "btnS"
        : "small";

  // return the button
  return (
    <button
      className={`${baseStyles} ${styleClasses[style]} ${sizeClasses[size]}`}
      type={type}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {/* icon left */}
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      {/* label */}
      <Typography variant={typographyVariant} className="font-figtreeRegular">
        {label}
      </Typography>
      {/* icon right */}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  );
};
