"use client";

import { cn } from "@/utils/clsx";
import { AvatarSize } from "@/utils/enum";
import { getSeasonColor } from "@/utils/SeasonUtils";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

/*
  @desc avatar component from shadcn/ui
*/

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: AvatarSize;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size = AvatarSize.small, ...props }, ref) => {
  // get the seasonal color
  const seasonalColor = getSeasonColor();
  // return the avatar
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        `relative flex shrink-0 overflow-hidden rounded-full border-2 border-${seasonalColor}-dark bg-${seasonalColor}-light`,
        size,
        className,
      )}
      {...props}
    />
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  size?: AvatarSize;
}

/*
  @desc AvatarImage component from shadcn/ui
*/
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full object-cover object-center",
      className,
    )}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
