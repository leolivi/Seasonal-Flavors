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
      className={`my-10 w-fit cursor-pointer rounded-full px-10 py-2 hover:bg-sfred active:bg-violet-700 bg-${seasonalColor}-light `}
    >
      <Typography variant="btnL">
        <p className="font-figtreeRegular text-sfblack active:text-sfwhite">
          {children}
        </p>
      </Typography>
    </div>
  );
};
