"use client";
import MobileNav from "../assets/icons/mobile-nav.svg";
import { useEffect, useRef, useState } from "react";
import NavList from "@/components/nav-list/nav-list";
import useMediaQuery from "@/utils/useMediaQuery";
import Home from "../assets/icons/home.svg";
import Soup from "../assets/icons/soup.svg";
import Profil from "../assets/icons/profil.svg";
import Logo from "@/components/ui/logo";
import { NavStyle } from "@/components/nav-item/nav-item";
import { useClickAway } from "react-use";
import MobileNavigation from "@/components/mobile-navigation/mobile-navigation";
import { usePathname } from "next/navigation";
import { getSeasonColor } from "@/utils/SeasonUtils";
// import { useSession } from "next-auth/react";

interface HeaderContainerProps {
  color?: string;
  children: React.ReactNode;
}

// wrapper component for semantic structure and responsiveness
const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <header
      className="px-4 py-0 min-[640px]:p-10 min-[640px]:pr-8 min-[640px]:pt-0"
      data-testid="header"
    >
      <nav className="flex w-full flex-row items-center min-[640px]:justify-between min-[640px]:gap-6">
        {children}
      </nav>
    </header>
  );
};

interface DesktopNavProps {
  seasonalColor: string;
  navigationItems: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
}

// component for desktop nav
const DesktopNav = ({ navigationItems }: DesktopNavProps) => {
  return <NavList items={navigationItems} style={NavStyle.HEADER} />;
};

interface MobileNavIconProps {
  onClick: () => void;
  color: string;
}

// component for mobile nav icon
const MobileNavIcon = ({ onClick, color }: MobileNavIconProps) => (
  <li
    className="absolute right-4 cursor-pointer min-[640px]:right-0"
    data-testid="mobile-nav-icon"
  >
    <MobileNav
      onClick={onClick}
      className={`bg-${color}-light h-12 w-auto rounded-full`}
    />
  </li>
);

// header component
const Header = () => {
  // const { data: session } = useSession();
  // const isAuthenticated = !!session;

  const seasonalColor = getSeasonColor();
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // define routes
  const navigationItems = [
    {
      icon: <Soup className="w-5" />,
      label: "Rezepte",
      href: "/recipes",
    },
    {
      icon: <Profil className="w-5" />,
      label: "anmelden",
      href: "/session",
    },
  ];

  if (!isDesktop) {
    navigationItems.unshift({
      icon: <Home className="w-5" />,
      label: "Home",
      href: "/",
    });
  }

  // Close modal when the route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close modal on click away
  useClickAway(ref, () => setIsOpen(false));

  return (
    <HeaderContainer color={seasonalColor}>
      <Logo variant="header" />
      {isDesktop ? (
        <DesktopNav
          seasonalColor={seasonalColor}
          navigationItems={navigationItems}
        />
      ) : (
        <>
          <MobileNavIcon onClick={toggleDropdown} color={seasonalColor} />
          <div ref={ref}>
            <MobileNavigation
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              navigationItems={navigationItems}
            />
          </div>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;
