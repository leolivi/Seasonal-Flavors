"use client";
import SeasonalFlavorsLogo from "../assets/logo/seasonal-flavors-logo.svg";
import MobileNav from "../assets/icons/mobile-nav.svg";
import { useState } from "react";
import MobileNavigation from "@/components/navigation/mobileNavigation";
import { Season } from "@/utils/Season";
import Link from "next/link";
import NavList from "@/components/navigation/navList";
import useMediaQuery from "@/utils/useMediaQuery";
import Home from "../assets/icons/home.svg";
import Soup from "../assets/icons/soup.svg";
import Profil from "../assets/icons/profil.svg";
// import { useSession } from "next-auth/react";

const Header = () => {
  // const { data: session } = useSession();
  // const isAuthenticated = !!session;

  const season = new Season();
  const seasonalColor = season.getColor();

  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 640px)");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const navigationItems = [
    {
      icon: <Soup className="w-5" />,
      label: "Rezepte",
      href: "/rezepte",
    },
    {
      icon: <Profil className="w-5" />,
      label: "anmelden",
      href: "/login",
    },
  ];

  if (!isDesktop) {
    navigationItems.unshift({
      icon: <Home className="w-5" />,
      label: "Home",
      href: "/",
    });
  }

  return (
    <HeaderContainer color={seasonalColor}>
      <Logo />
      {isDesktop ? (
        <DesktopHeader
          seasonalColor={seasonalColor}
          navigationItems={navigationItems}
        />
      ) : (
        <>
          <MobileNavIcon onClick={toggleDropdown} color={seasonalColor} />
          <MobileNavigation
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            navigationItems={navigationItems}
          />
        </>
      )}
    </HeaderContainer>
  );
};

interface DesktopHeaderProps {
  seasonalColor: string;
  navigationItems: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }[];
}

const DesktopHeader = ({ navigationItems }: DesktopHeaderProps) => {
  return <NavList items={navigationItems} />;
};

interface HeaderContainerProps {
  color?: string;
  children: React.ReactNode;
}

const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <header className="p-10 min-[640px]:pr-5">
      <nav className="flex w-full flex-row items-center min-[640px]:justify-between min-[640px]:gap-6">
        {children}
      </nav>
    </header>
  );
};

interface MobileNavIconProps {
  onClick: () => void;
  color: string;
}

const MobileNavIcon = ({ onClick, color }: MobileNavIconProps) => (
  <li className="absolute right-10 cursor-pointer">
    <MobileNav
      onClick={onClick}
      className={`bg-${color}-light h-12 w-auto rounded-full`}
    />
  </li>
);

const Logo = () => (
  <li className="cursor-pointer min-[640px]:flex">
    <Link href="/">
      <SeasonalFlavorsLogo className="h-8 w-auto min-[640px]:h-10" />
    </Link>
  </li>
);

export default Header;
