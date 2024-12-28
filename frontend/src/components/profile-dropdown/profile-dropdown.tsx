import React, { forwardRef } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarSize,
} from "@/components/avatar/avatar";
import { FaUserCircle } from "react-icons/fa";
import { Lock, LogOut, User } from "lucide-react";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";
import { Typography } from "../ui/typography";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useMediaQuery from "@/hooks/useMediaQuery";

interface UserData {
  id: number;
  username: string;
  email: string;
  imageSrc?: string;
}

interface ProfileDropdownProps {
  userData: UserData | null;
}

const ProfileDropdown = forwardRef<HTMLDivElement, ProfileDropdownProps>(
  ({ userData }, ref) => {
    const seasonalColor = getSeasonColor();
    const isDesktop = useMediaQuery("(min-width: 640px)");

    const handleLogout = async () => {
      try {
        toast({
          variant: "default",
          title: "Abgemeldet",
          description: "Sie wurden erfolgreich abgemeldet.",
        });

        await new Promise((resolve) => setTimeout(resolve, 2000));
        await signOut({ redirect: true, callbackUrl: "/session" });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Fehler",
          description:
            "Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.",
        });
        console.error("Logout failed: ", error);
      }
    };

    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Avatar size={AvatarSize.small}>
            <AvatarImage src={userData?.imageSrc} alt="User's avatar" />
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
            className="z-50 mt-2 w-fit rounded-md bg-sfwhite p-4 shadow-lg"
            sideOffset={5}
            align={isDesktop ? "end" : "center"}
            ref={ref}
          >
            <DropdownMenu.Item className="mb-2 flex items-center gap-2 px-2">
              <Link href="/profile" className="flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                <Typography variant="small">
                  <span className="text-sfblack">Mein Profil</span>
                </Typography>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="mb-2 flex items-center gap-2 px-2">
              <Link
                href="/change-password"
                className="flex w-full items-center"
              >
                <Lock className="mr-2 h-4 w-4" />
                <Typography variant="small">
                  <span className="text-sfblack">Passwort ändern</span>
                </Typography>
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator
              className={`border-${seasonalColor}-dark mb-2 rounded border-[1px]`}
            />
            <DropdownMenu.Item
              className="flex cursor-pointer items-center gap-2 px-2"
              onSelect={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
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
