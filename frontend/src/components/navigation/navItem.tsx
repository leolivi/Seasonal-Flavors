// components/NavItem.js
import Link from "next/link";
import { Typography } from "../ui/typography";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NavItem = ({ icon, label, href }: NavItemProps) => {
  return (
    <li className="cursor-pointer items-center px-2 py-1 transition-all duration-300 ease-in-out hover:rounded-full hover:bg-sfwhite hover:bg-opacity-80">
      <Typography variant="body" className="flex flex-row gap-3 text-sfblack">
        {icon}
        <Link href={href}>{label}</Link>
      </Typography>
    </li>
  );
};

export default NavItem;
