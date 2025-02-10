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
import { useSession } from "next-auth/react";
import { MobileNavIcon } from "@/components/mobile-navigation/mobile-nav-icon";
import { DesktopNav } from "@/components/desktop-nav/desktop-nav";
import ProfileDropdown from "@/components/profile-dropdown/profile-dropdown";
import { UserData } from "@/services/user/userService";
import { BiBookHeart } from "react-icons/bi";
import { getAuthenticatedUser } from "@/utils/auth-user";

interface HeaderContainerProps {
  color?: string;
  children: React.ReactNode;
}

/*
  @desc Header container component for semantic structure and responsiveness
*/
const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <header
      className="px-4 py-6 min-[640px]:p-8 min-[640px]:pr-4"
      data-testid="header"
    >
      <nav className="flex w-full flex-row items-center min-[640px]:justify-between min-[640px]:gap-6">
        <ul className="flex w-full flex-row items-center min-[640px]:justify-between min-[640px]:gap-6">
          {children}
        </ul>
      </nav>
    </header>
  );
};

/*
  @desc Header component
*/
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

  // useEffect for mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch the user profile image data once authenticated
  useEffect(() => {
    // Function to fetch the user data
    const fetchUserData = async () => {
      const user = await getAuthenticatedUser();
      setUserData(user);
    };
    // Function to close the modal when clicking outside
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

    // Fetch the user data
    fetchUserData();

    // Event-Listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Close the MobileNavigation element when the path changes
    setIsOpen(false);

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [status, pathname]);

  // Navigation items
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

  // Add home icon to the navigation items if not on desktop
  if (!isDesktop) {
    navigationItems.unshift({
      icon: (
        <span className="flex items-center">
          <BiHomeHeart size={24} width={20} aria-hidden="true" />
        </span>
      ),
      label: "Home",
      href: "/",
      isActive: pathname === "/",
    });
  }

  // Render nothing until the component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <HeaderContainer color={seasonalColor}>
      <li>
        <Logo variant="header" />
      </li>
      {/* Desktop layout */}
      {isDesktop ? (
        <li>
          <DesktopNav
            seasonalColor={seasonalColor}
            navigationItems={navigationItems}
          />
        </li>
      ) : (
        /* Mobile layout */
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
