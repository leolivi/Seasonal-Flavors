import { Typography } from "../ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";

interface ButtonProps {
  label: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: ButtonStyle;
  recipeSeasonColor?: string;
  type?: "submit" | "button";
}

export enum ButtonStyle {
  PRIMARY = "primary",
  OUTLINE = "outline",
  SIMPLE = "simple",
}

// Button Component passing a label and an onClick function
export const Button = ({
  style = ButtonStyle.PRIMARY,
  recipeSeasonColor: recipeSeasonColor,
  type = "button",
  ...props
}: ButtonProps) => {
  const seasonalColor = getSeasonColor();

  const baseStyles =
    "flex w-fit items-center justify-center gap-1 rounded-full ";
  const stylesByType = {
    [ButtonStyle.PRIMARY]: `my-10 px-10 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light cursor-pointer`,
    [ButtonStyle.OUTLINE]: `my-10 border-2 px-4 text-sfblack border-${seasonalColor} bg-sfwhite cursor-default`,
    [ButtonStyle.SIMPLE]: `text-sfblack cursor-pointer`,
  };

  return (
    <button
      className={`${baseStyles} ${stylesByType[style]} `}
      type={type}
      onClick={props.onClick}
    >
      {props.iconLeft && <span className="mr-2">{props.iconLeft}</span>}
      <Typography
        variant={style === ButtonStyle.PRIMARY ? "btnL" : "btnS"}
        className="font-figtreeRegular"
      >
        {props.label}
      </Typography>
      {props.iconRight && <span className="mr-2">{props.iconRight}</span>}
    </button>
  );
};
