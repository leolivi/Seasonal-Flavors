// components/NavItem.js
import Link from "next/link";
import { Typography } from "../ui/typography";
import useMediaQuery from "@/utils/useMediaQuery";
import { Season } from "@/utils/Season";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NavItem = ({ icon, label, href }: NavItemProps) => {
  const season = new Season();
  const seasonalColor = season.getColor();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <li
      className={`cursor-pointer items-center justify-center px-4 py-1 transition-all duration-300 ease-in-out hover:rounded-full ${
        isDesktop
          ? `hover:bg-${seasonalColor}-light`
          : "active:bg-sfwhite active:bg-opacity-80"
      } min-[640px]:mt-0`}
    >
      <Typography variant="body" className="flex flex-row gap-3 text-sfblack">
        {icon}
        <Link href={href}>{label}</Link>
      </Typography>
    </li>
  );
};

export default NavItem;
