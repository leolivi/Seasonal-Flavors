// components/NavItem.js
import Link from "next/link";
import { Typography } from "../ui/typography";
import useMediaQuery from "@/utils/useMediaQuery";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { useSession } from "next-auth/react";

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
  style: NavStyle;
}

export enum NavStyle {
  FOOTER = "footer",
  HEADER = "header",
}

// component creating a single nav item
const NavItem = ({ icon, label, href, style }: NavItemProps) => {
  const seasonalColor = getSeasonColor();
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const isFooter = style === NavStyle.FOOTER;
  const { status } = useSession();

  return (
    <li
      // styling depends on screen width
      className={`cursor-pointer items-center justify-center px-4 py-1 transition-all duration-300 ease-in-out last:self-center last:px-2 hover:rounded-full hover:drop-shadow-lg ${
        isFooter
          ? ""
          : isDesktop
            ? `hover:bg-${seasonalColor}-light`
            : "active:bg-sfwhite active:bg-opacity-80"
      } ${status === "authenticated" && `last:hover:bg-transparent`} min-[640px]:mt-0`}
    >
      <Typography variant={isFooter ? "xs" : "btnS"} className="text-sfblack">
        <Link className="flex flex-row gap-3" href={href}>
          {icon}
          {label}
        </Link>
      </Typography>
    </li>
  );
};

export default NavItem;
