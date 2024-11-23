import { NavStyle } from "../nav-item/nav-item";
import NavList from "../nav-list/nav-list";

interface DesktopNavProps {
  seasonalColor: string;
  navigationItems: {
    icon?: React.ReactNode;
    label: string;
    href: string;
  }[];
}

// component for desktop nav
export const DesktopNav = ({ navigationItems }: DesktopNavProps) => {
  return <NavList items={navigationItems} style={NavStyle.HEADER} />;
};
