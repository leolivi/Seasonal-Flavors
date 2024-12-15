"use client";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import Home from "../assets/icons/home.svg";
import Soup from "../assets/icons/soup.svg";
import Profil from "../assets/icons/profil.svg";
import Logo from "@/components/ui/logo";
import MobileNavigation from "@/components/mobile-navigation/mobile-navigation";
import { usePathname } from "next/navigation";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { useSession } from "next-auth/react";
import { MobileNavIcon } from "@/components/mobile-navigation/mobile-nav-icon";
import { DesktopNav } from "@/components/desktop-nav/desktop-nav";
import ProfileDropdown from "@/components/profile-dropdown/profile-dropdown";

interface HeaderContainerProps {
  color?: string;
  children: React.ReactNode;
}

// wrapper component for semantic structure and responsiveness
const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <header
      className="px-4 py-6 min-[640px]:p-10 min-[640px]:pr-8"
      data-testid="header"
    >
      <nav className="flex w-full list-none flex-row items-center min-[640px]:justify-between min-[640px]:gap-6">
        {children}
      </nav>
    </header>
  );
};

// header component
const Header = () => {
  const { status } = useSession();
  const seasonalColor = getSeasonColor();
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // TODO: Add Profile Image here
  // Fetch the user profile image data once authenticated
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (status === "authenticated") {
  //       // Fetch user profile image
  //       const response = await dataFetch(
  //         `${process.env.BACKEND_URL}/api/images?profile=1&recipe_id=null`,
  //       );
  //       setUserData(response?.[0] || null); // Assume the first image is the profile image
  //     }
  //   };

  //   fetchUserData();
  // }, [status]);

  // Close modal on click away

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        (ref.current && ref.current.contains(target)) ||
        (profileRef.current && profileRef.current.contains(target))
      ) {
        return; // Klick innerhalb eines relevanten Bereichs
      }

      setIsOpen(false); // Klick außerhalb
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close modal when the route changes
  useEffect(() => setIsOpen(false), [pathname]);

  const navigationItems = [
    {
      icon: <Soup className="w-5" />,
      label: "Rezepte",
      href: "/recipes",
    },
    ...(status === "authenticated"
      ? [
          {
            label: "meine Rezepte",
            href: "/my-recipes",
          },
        ]
      : []),
    {
      icon:
        status === "authenticated" ? (
          <ProfileDropdown ref={profileRef} />
        ) : (
          <Profil className="w-5" />
        ),
      label: status === "authenticated" ? "" : "anmelden",
      href: status === "authenticated" ? "" : "/session",
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
