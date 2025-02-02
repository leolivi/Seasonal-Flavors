/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSize,
} from "@/components/avatar/avatar";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { Typography } from "../ui/typography";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useMediaQuery from "@/hooks/use-media-query";
import { SessionLoader } from "../auth-session/auth-session";
import { FaBookmark } from "react-icons/fa";
import { ImageData, getProfileImage } from "@/services/image/imageService";
import { UserData } from "@/services/user/userService";

interface ProfileDropdownProps {
  userData: UserData | null;
}

const ProfileDropdown = forwardRef<HTMLDivElement, ProfileDropdownProps>(
  ({ userData }, ref) => {
    const seasonalColor = getSeasonColor();
    const isDesktop = useMediaQuery("(min-width: 640px)");
    const [imageData, setImageData] = useState<ImageData | undefined>();

    const fetchProfileImage = async () => {
      if (userData?.id) {
        const fetchedImageData = await getProfileImage(userData.id);
        setImageData(fetchedImageData);
      }
    };

    useEffect(() => {
      fetchProfileImage();
    }, [userData?.id]);

    useEffect(() => {
      const handleImageUpdate = () => {
        fetchProfileImage();
      };

      window.addEventListener("profileImageUpdate", handleImageUpdate);

      return () => {
        window.removeEventListener("profileImageUpdate", handleImageUpdate);
      };
    }, [userData?.id]);

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

    if (!userData) {
      return <SessionLoader />;
    }

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Avatar size={AvatarSize.small}>
            <AvatarImage
              src={imageData?.file_path || ""}
              alt="User's avatar"
              loading="eager"
            />
            <AvatarFallback>
              <FaUserCircle
                size={100}
                className={`bg-${seasonalColor}`}
                color="white"
              />
            </AvatarFallback>
          </Avatar>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`z-50 mt-2 w-fit rounded-md bg-sfwhite p-4 shadow-lg`}
            sideOffset={5}
            align={isDesktop ? "end" : "center"}
            ref={ref}
          >
            <DropdownMenu.Item
              className={`cursor-pointer font-figtreeRegular hover:bg-${seasonalColor}-light rounded px-2 outline-none data-[highlighted]:bg-${seasonalColor}-light mb-2 flex items-center data-[highlighted]:text-sfblack`}
              asChild
            >
              <Link href="/profile" className="flex w-full items-center">
                <IoPersonSharp className="mr-2 h-4 w-4" />
                <Typography variant="small">
                  <span className="text-sfblack">Mein Profil</span>
                </Typography>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className={`cursor-pointer font-figtreeRegular hover:bg-${seasonalColor}-light rounded px-2 outline-none data-[highlighted]:bg-${seasonalColor}-light mb-2 flex items-center data-[highlighted]:text-sfblack`}
              asChild
            >
              <Link href="/favorites" className="flex w-full items-center">
                <FaBookmark className="mr-2 h-4 w-4" />
                <Typography variant="small">
                  <span className="text-sfblack">Favoriten</span>
                </Typography>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              className={`cursor-pointer font-figtreeRegular hover:bg-${seasonalColor}-light rounded px-2 outline-none data-[highlighted]:bg-${seasonalColor}-light mb-2 flex items-center data-[highlighted]:text-sfblack`}
              asChild
            >
              <Link
                href="/forgot-password"
                className="flex w-full items-center"
              >
                <FaLock className="mr-2 h-4 w-4" />
                <Typography variant="small">
                  <span className="text-sfblack">Passwort ändern</span>
                </Typography>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator
              className={`border-${seasonalColor}-dark mb-2 rounded border-[1px]`}
            />
            <DropdownMenu.Item
              className={`cursor-pointer font-figtreeRegular hover:bg-${seasonalColor}-light rounded px-2 outline-none data-[highlighted]:bg-${seasonalColor}-light flex items-center data-[highlighted]:text-sfblack`}
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
