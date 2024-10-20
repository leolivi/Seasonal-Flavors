import { Season } from "@/utils/Season";
import { Typography } from "../ui/typography";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

// Button Component passing a label and an onClick function
export const Button = ({ label, onClick }: ButtonProps) => {
  const season = new Season();
  const seasonalColor = season.getColor();

  return (
    <button
      className={`my-10 w-fit cursor-pointer rounded-full px-10 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light `}
      onClick={onClick}
    >
      <Typography variant="btnL" className="font-figtreeRegular">
        {label}
      </Typography>
    </button>
  );
};
