/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSize,
} from "@/components/ui/avatar";
import { FaBookmark } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { ImageData, getProfileImage } from "@/services/image/imageService";
import { IoPersonSharp } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { SessionLoader } from "../auth-session/auth-session";
import { signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { Typography } from "../ui/typography";
import { UserData } from "@/services/user/userService";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useMediaQuery from "@/hooks/use-media-query";

interface ProfileDropdownProps {
  userData: UserData | null;
}

/*
  @desc Profile dropdown
*/
const ProfileDropdown = forwardRef<HTMLDivElement, ProfileDropdownProps>(
  ({ userData }, ref) => {
    // get the seasonal color
    const seasonalColor = getSeasonColor();
    // check if the user is on a desktop
    const isDesktop = useMediaQuery("(min-width: 730px)");
    // set the image data
    const [imageData, setImageData] = useState<ImageData | undefined>();

    // fetch the profile image
    const fetchProfileImage = async () => {
      if (userData?.id) {
        const fetchedImageData = await getProfileImage(userData.id);
        setImageData(fetchedImageData);
      }
    };

    useEffect(() => {
      fetchProfileImage();
    }, [userData]);

    // handle the image update
    useEffect(() => {
      const handleImageUpdate = () => {
        fetchProfileImage();
      };

      window.addEventListener("profileImageUpdate", handleImageUpdate);
      return () => {
        window.removeEventListener("profileImageUpdate", handleImageUpdate);
      };
    }, [userData?.id]);

    // handle the logout
    const handleLogout = async () => {
      try {
        toast({
          variant: "default",
          title: "Abgemeldet",
          description: "Du wurdest erfolgreich abgemeldet.",
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        await signOut({ redirect: true, callbackUrl: "/session" });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Abmeldung fehlgeschlagen. Bitte versuche es erneut.",
        });
        console.error("Logout failed: ", error);
      }
    };

    // render the session loader if the user data is not available
    if (!userData) {
      return <SessionLoader size="small" />;
    }

    // menu items
    const menuItems = [
      {
        href: "/profile",
        icon: <IoPersonSharp className="mr-2 h-4 w-4" />,
        label: "Mein Profil",
      },
      {
        href: "/favorites",
        icon: <FaBookmark className="mr-2 h-4 w-4" />,
        label: "Favoriten",
      },
      {
        href: "/forgot-password",
        icon: <FaLock className="mr-2 h-4 w-4" />,
        label: "Passwort ändern",
      },
    ];

    // render the dropdown menu
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          {/* avatar */}
          <button
            type="button"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.click();
              }
            }}
            aria-label="Profilmenü öffnen"
          >
            <Avatar size={AvatarSize.small}>
              {/* avatar image */}
              <AvatarImage
                src={imageData?.file_path || ""}
                alt="User's avatar"
                loading="eager"
              />
              {/* avatar fallback */}
              <AvatarFallback>
                <FaUserCircle
                  size={100}
                  className={`bg-${seasonalColor}`}
                  color="white"
                />
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenu.Trigger>

        {/* dropdown menu portal */}
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`z-50 mt-2 w-fit rounded-md bg-sfwhite p-4 shadow-lg`}
            sideOffset={5}
            align={isDesktop ? "end" : "center"}
            ref={ref}
          >
            {/* map through the menu items */}
            {menuItems.map((item, index) => (
              <DropdownMenu.Item
                key={item.href}
                className={`cursor-pointer font-figtreeRegular hover:bg-${seasonalColor}-light rounded px-2 outline-none data-[highlighted]:bg-${seasonalColor}-light mb-4 flex items-center data-[highlighted]:text-sfblack min-[640px]:mb-2`}
                asChild
              >
                <Link href={item.href} className="flex w-full items-center">
                  {item.icon}
                  <Typography variant="small">
                    <span className="text-sfblack">{item.label}</span>
                  </Typography>
                </Link>
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Separator
              className={`border-${seasonalColor}-dark mb-2 rounded border-[1px]`}
            />
            <DropdownMenu.Item
              className={`cursor-pointer font-figtreeRegular hover:bg-${seasonalColor}-light rounded px-2 outline-none data-[highlighted]:bg-${seasonalColor}-light mt-4 flex items-center data-[highlighted]:text-sfblack min-[640px]:mt-0`}
              onSelect={handleLogout}
            >
              <PiSignOutBold className="mr-2 h-4 w-4" />
              <Typography variant="small">
                <span className="text-sfblack">Abmelden</span>
              </Typography>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
);

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
