import { Season } from "@/utils/Season";
import { Typography } from "../ui/typography";

interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  const season = new Season();
  const seasonalColor = season.getColor();

  // const hoverStyle: React.CSSProperties = {
  //   backgroundColor: `${seasonalColor}-light`,
  //   transition: "all 0.3s ease",
  // };

  // const clickStyle: React.CSSProperties = {
  //   backgroundColor: `${seasonalColor}-dark`,
  //   color: "sfwhite",
  // };

  return (
    <div
      className={`my-10 w-fit cursor-pointer rounded-full px-10 py-2 text-sfblack hover:text-sfwhite active:text-sfwhite hover:bg-${seasonalColor} active:bg-${seasonalColor}-dark bg-${seasonalColor}-light `}
    >
      <Typography variant="btnL">
        <p className="font-figtreeRegular">{children}</p>
      </Typography>
    </div>
  );
};
