"use client";
import { useEffect, useRef, useState } from "react";
import useMediaQuery from "@/hooks/use-media-query";
import { BiHomeHeart } from "react-icons/bi";
import { PiBowlSteamFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import Logo from "@/components/ui/logo";
import MobileNavigation from "@/components/mobile-navigation/mobile-navigation";
import { usePathname } from "next/navigation";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { getSession, useSession } from "next-auth/react";
import { MobileNavIcon } from "@/components/mobile-navigation/mobile-nav-icon";
import { DesktopNav } from "@/components/desktop-nav/desktop-nav";
import ProfileDropdown from "@/components/profile-dropdown/profile-dropdown";
import { getCurrentUser, UserData } from "@/services/user/userService";
import { BiBookHeart } from "react-icons/bi";

interface HeaderContainerProps {
  color?: string;
  children: React.ReactNode;
}

// wrapper component for semantic structure and responsiveness
const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <header
      className="px-4 py-6 min-[640px]:p-8 min-[640px]:pr-4"
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
  const [isMounted, setIsMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 730px)");
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // useEffect für das Mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      icon: !isDesktop ? <PiBowlSteamFill size={24} width={20} /> : null,
      label: "Rezepte",
      href: "/recipes",
      isActive: pathname === "/recipes",
    },
    ...(status === "authenticated"
      ? [
          {
            icon: !isDesktop ? <BiBookHeart size={24} width={20} /> : null,
            label: "meine Rezepte",
            href: "/my-recipes",
            isActive: pathname === "/my-recipes",
          },
        ]
      : []),
    {
      icon:
        status === "authenticated" ? (
          <ProfileDropdown ref={profileRef} userData={userData} />
        ) : !isDesktop ? (
          <IoPersonSharp size={20} width={20} />
        ) : null,
      label: status === "authenticated" ? "" : "anmelden",
      href: status === "authenticated" ? "" : "/session",
      isActive: pathname === "/session",
    },
  ];

  if (!isDesktop) {
    navigationItems.unshift({
      icon: <BiHomeHeart size={24} width={20} />,
      label: "Home",
      href: "/",
      isActive: pathname === "/",
    });
  }

  // Render nichts, bis die Komponente gemounted ist
  if (!isMounted) {
    return null;
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
