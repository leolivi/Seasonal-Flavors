import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";

interface ButtonProps {
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  style?: ButtonStyle;
  recipeSeasonColor?: string;
}

export enum ButtonStyle {
  PRIMARY = "primary",
  OUTLINE = "outline",
}

// Button Component passing a label and an onClick function
export const Button = ({
  label,
  iconLeft,
  iconRight,
  onClick,
  style = ButtonStyle.PRIMARY,
  recipeSeasonColor: recipeSeasonColor,
}: ButtonProps) => {
  const seasonalColor = getSeasonColor();

  const baseStyles =
    "flex w-fit cursor-pointer items-center justify-center gap-1 rounded-full ";
  const stylesByType = {
    [ButtonStyle.PRIMARY]: `px-10 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light`,
    [ButtonStyle.OUTLINE]: `border-2 px-4 text-sfblack border-${recipeSeasonColor} bg-sfwhite cursor-default`,
  };

  return (
    <button
      className={`${baseStyles} ${stylesByType[style]} my-10`}
      onClick={onClick}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <Typography
        variant={style === ButtonStyle.PRIMARY ? "btnL" : "btnS"}
        className="font-figtreeRegular"
      >
        {label}
      </Typography>
      {iconRight && <span className="mr-2">{iconRight}</span>}
    </button>
  );
};
