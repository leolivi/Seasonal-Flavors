import * as React from "react";

import { cn } from "@/lib/utils";
import { getSeasonColor } from "@/utils/SeasonUtils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const seasonalColor = getSeasonColor();

    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full border-2 border-${seasonalColor}-dark bg-${seasonalColor}-light rounded-md px-3 py-2 font-figtreeRegular text-base text-sfblack file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-sfblack focus:bg-sfwhite focus-visible:outline-none disabled:cursor-not-allowed`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
