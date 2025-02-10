import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import useMediaQuery from "@/hooks/use-media-query";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { useSession } from "next-auth/react";
import { NavStyle } from "@/utils/enum";

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  href: string;
  style: NavStyle;
  isActive?: boolean;
}

/*
  @desc Nav item
*/
const NavItem = ({ icon, label, href, style, isActive }: NavItemProps) => {
  // get the seasonal color
  const seasonalColor = getSeasonColor();
  // check if the user is on a desktop
  const isDesktop = useMediaQuery("(min-width: 730px)");
  // check if the style is footer
  const isFooter = style === NavStyle.FOOTER;
  // get the session status
  const { status } = useSession();

  // render the component
  return (
    <li
      // styling depends on screen width
      className={`cursor-pointer items-center justify-center px-4 py-1 transition-all duration-300 ease-in-out last:gap-0 ${status === "authenticated" && `last:hover:bg-transparent`} min-[640px]:mt-0`}
      aria-label={label}
    >
      <Typography
        variant={isFooter ? "xs" : "btnS"}
        className={`relative ${isActive && `text-${seasonalColor}-dark`} group flex text-sfblack transition-all duration-300 ease-in-out`}
      >
        <Link
          className={`via-${seasonalColor}-dark to-${seasonalColor}-dark hover:text-${seasonalColor}-dark flex flex-row items-center bg-gradient-to-r from-transparent bg-no-repeat transition-all duration-300 ease-in-out [background-size:0%_100%] hover:[background-size:100%_100%] ${
            !isDesktop ? "gap-3" : "gap-0"
          }`}
          href={href}
          aria-label={label}
        >
          {icon}
          <span className="relative">
            {label}
            {isDesktop && !isFooter && (
              <span
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-${seasonalColor}-dark rounded-full transition-all duration-300 ease-in-out group-hover:w-full`}
                aria-hidden="true"
              />
            )}
          </span>
        </Link>
      </Typography>
    </li>
  );
};

export default NavItem;
