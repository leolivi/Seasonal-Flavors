import { NavStyle } from "@/utils/enum";
import NavList from "../nav-list/nav-list";

interface DesktopNavProps {
  seasonalColor: string;
  navigationItems: {
    icon?: React.ReactNode;
    label: string;
    href: string;
  }[];
}

/*
  @desc Displays the desktop navigation
*/
export const DesktopNav = ({ navigationItems }: DesktopNavProps) => {
  return <NavList items={navigationItems} style={NavStyle.HEADER} />;
};
