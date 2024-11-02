import { Season } from "@/utils/Season";
import { Typography } from "../ui/typography";

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

// Button Component passing a label and an onClick function
export const Button = ({ label, icon, onClick }: ButtonProps) => {
  const season = new Season();
  const seasonalColor = season.getColor();

  return (
    <button
      className={`my-10 flex w-fit cursor-pointer items-center justify-center gap-1 rounded-full px-10 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light `}
      onClick={onClick}
    >
      <Typography variant="btnL" className="font-figtreeRegular">
        {label}
      </Typography>
      {icon && <span className="mr-2">{icon}</span>}
    </button>
  );
};
