import * as React from "react";
import { cn } from "@/utils/clsx";
import { getSeasonColor } from "@/utils/SeasonUtils";
import { Typography } from "./typography";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useFormField } from "./form";

/*
  @desc Input component from shadcn/ui
*/

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const seasonalColor = getSeasonColor();
    const [showPassword, setShowPassword] = React.useState(false);
    const { error } = useFormField();

    return (
      <div className="relative w-full">
        <Typography variant="body">
          <input
            type={type === "password" && showPassword ? "text" : type}
            className={cn(
              `flex w-full border-2 border-${seasonalColor}-dark bg-${seasonalColor}-light rounded-md px-3 py-2 font-figtreeRegular text-sfblack file:border-0 file:bg-transparent file:text-sm placeholder:text-gray-500 focus:bg-sfwhite focus-visible:outline-none disabled:cursor-not-allowed ${error && `border-2 border-sfred`}`,
              className,
            )}
            ref={ref}
            {...props}
          />
        </Typography>
        {/* Toggle password visibility */}
        {type === "password" && (
          <div
            className="absolute right-3 top-3 cursor-pointer text-sfblack min-[1020px]:top-4"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff size={25} /> : <IoEye size={25} />}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
