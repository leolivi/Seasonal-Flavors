"use client";
import SeasonalFlavorsLogo from "../assets/logo/seasonal-flavors-logo.svg";
import MobileNav from "../assets/icons/mobile-nav.svg";
import { useState } from "react";
import MobileNavigation from "@/components/navigation/mobileNavigation";
import { Season } from "@/utils/Season";
import Link from "next/link";

const Header = () => {
  const season = new Season();
  const seasonalColor = season.getColor();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <HeaderContainer color={seasonalColor}>
      <Logo />
      <MobileNavIcon onClick={toggleDropdown} color={seasonalColor} />
      <MobileNavigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </HeaderContainer>
  );
};

interface HeaderContainerProps {
  color?: string;
  children: React.ReactNode;
}

const HeaderContainer = ({ children }: HeaderContainerProps) => (
  <header>
    <nav className="p-10">
      <ul className="flex w-full flex-row items-center justify-between md:justify-center">
        {children}
      </ul>
    </nav>
  </header>
);

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
  <li className="cursor-pointer min-[640px]:absolute min-[640px]:left-1/2 min-[640px]:-translate-x-1/2 min-[640px]:transform">
    <Link href="/">
      <SeasonalFlavorsLogo className="h-8 w-auto min-[640px]:h-10" />
    </Link>
  </li>
);

export default Header;
