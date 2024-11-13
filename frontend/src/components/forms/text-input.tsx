"use client";

import { getSeasonColor } from "@/utils/SeasonUtils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "../ui/typography";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface TextInputProps {
  placeholder: string;
  name: string;
  type: string;
  required?: boolean;
  className?: string;
  autoComplete?: string;
}

export const TextInput = ({
  placeholder,
  name,
  type,
  required = false,
  className,
  autoComplete,
  ...rest
}: TextInputProps) => {
  const seasonalColor = getSeasonColor();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Retrieves form context from react-hook-form

  // Error message for the current field
  const error = errors[name]?.message as string | undefined;

  return (
    <div
      className={`relative mb-10 flex w-full flex-col items-center ${className} max-[640px]:w-2/3 min-[640px]:w-1/2 min-[1240px]:w-1/4`}
    >
      <div className="relative w-full">
        <Typography variant="body">
          <input
            type={type === "password" && showPassword ? "text" : type}
            placeholder={placeholder}
            className={`h-12 w-full rounded-md border-2 placeholder:font-figtreeRegular border-${seasonalColor}-dark bg-${seasonalColor}-light px-2 py-2 pr-10 text-sfblack placeholder:text-sfblack placeholder:opacity-60 hover:bg-white focus:bg-transparent min-[900px]:py-6 focus:border-${seasonalColor}-dark`}
            autoComplete={autoComplete}
            {...register(name, { required })}
            {...rest}
          />
        </Typography>
        {/* Toggle password visibility */}
        {type === "password" && (
          <div
            className="absolute right-3 top-3 cursor-pointer text-sfblack min-[900px]:top-3.5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff size={25} /> : <IoEye size={25} />}
          </div>
        )}
      </div>
      {/* Error message display */}
      {error && (
        <Typography variant="small">
          <p className="absolute left-0 top-[50px] mt-1 font-figtreeRegular text-sfred">
            {error}
          </p>
        </Typography>
      )}
    </div>
  );
};
