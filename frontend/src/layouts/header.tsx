"use client";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@/hooks/use-media-query";
import Home from "../assets/icons/home.svg";
import Soup from "../assets/icons/soup.svg";
import Profil from "../assets/icons/profil.svg";
import Logo from "@/components/ui/logo";
import MobileNavigation from "@/components/mobile-navigation/mobile-navigation";
import { usePathname } from "next/navigation";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { getSession, useSession } from "next-auth/react";
import { MobileNavIcon } from "@/components/mobile-navigation/mobile-nav-icon";
import { DesktopNav } from "@/components/desktop-nav/desktop-nav";
import ProfileDropdown from "@/components/profile-dropdown/profile-dropdown";
import { getCurrentUser, UserData } from "@/services/user/userService";

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
  const [userData, setUserData] = useState<UserData | null>(null);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Fetch the user profile image data once authenticated
  useEffect(() => {
    // Funktion zum Abrufen der Benutzerdaten
    const fetchUserData = async () => {
      if (status === "authenticated") {
        const session = await getSession();
        if (session?.accessToken) {
          const userData = await getCurrentUser(session.accessToken);
          setUserData(userData);
        }
      }
    };

    // Funktion zum Schließen des Modals bei Klick außerhalb
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        (ref.current && ref.current.contains(target)) ||
        (profileRef.current && profileRef.current.contains(target))
      ) {
        return;
      }

      setIsOpen(false);
    };

    // Abrufen der Benutzerdaten
    fetchUserData();

    // Event-Listener für Click-Outside
    document.addEventListener("mousedown", handleClickOutside);

    // Schließe das MobileNavigation-Element, wenn sich der Pfad ändert
    setIsOpen(false);

    // Cleanup-Funktion
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [status, pathname]);

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
          <ProfileDropdown ref={profileRef} userData={userData} />
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
