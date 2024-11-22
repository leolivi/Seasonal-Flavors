import Link from "next/link";
import { ReactNode } from "react";
import { Typography } from "@/components/ui/typography";
import { getSeasonColor } from "@/utils/SeasonUtils";
import clsx from "clsx";

interface DashboardCardProps {
  href: string;
  label: string;
  icon?: ReactNode;
  backgroundImage?: string;
  fontColor?: string;
}

const DashboardCard = ({
  href,
  label,
  icon,
  backgroundImage,
  fontColor = "sfblack",
}: DashboardCardProps) => {
  const seasonalColor = getSeasonColor();
  const style = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  return (
    <Link
      href={href}
      className={`bg-${seasonalColor} flex min-h-32 w-full flex-grow flex-row items-center justify-center gap-4 rounded px-6 py-8 shadow-lg transition-shadow hover:drop-shadow-lg`}
      style={style}
    >
      {icon && <div>{icon}</div>}
      <Typography
        variant="body"
        className={clsx("text-${fontColor} text-center font-figtreeRegular")}
      >
        {label}
      </Typography>
    </Link>
  );
};

export default DashboardCard;
