"use client";

import { getSeasonColor } from "@/utils/SeasonUtils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "../ui/typography";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

interface TextInputProps {
  placeholder: string; // placeholder text for the input field
  name: string; // the name of the field which react-hook-form uses to track the input
  type: string; // the HTML input type
  required?: boolean; // whether the input is required
  className?: string; // optional className for the input field
  validateAs?: "email" | "password" | "text"; // optional validation for the input field
  autoComplete?: string;
}

export const TextInput = ({
  placeholder,
  name,
  type,
  required = false,
  className,
  autoComplete,
  validateAs = "text",
  ...rest
}: TextInputProps) => {
  const seasonalColor = getSeasonColor();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext(); // retrieves the form context from react-hook-form -> parent component

  // Define validation rules based on the `validateAs` prop
  const validationRules = {
    // If required, display a required field message
    required: required && "Dieses Feld ist erforderlich",

    ...(validateAs === "text" && {
      minLength: {
        value: 2,
        message: "Der Benutzername muss mindestens 2 Zeichen lang sein", // Error message for short username
      },
      pattern: {
        value: /^[a-zA-Z0-9]+$/, // Only letters and numbers allowed
        message: "Der Benutzername darf nur Buchstaben und Zahlen enthalten", // Error message for invalid characters
      },
    }),

    // Email validation rule, checks if the input matches a standard email pattern
    ...(validateAs === "email" && {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Ungültige Email Adresse", // Error message for invalid email format
      },
    }),

    // Password validation rule, checks for a minimum length of 8 characters
    ...(validateAs === "password" && {
      minLength: {
        value: 8,
        message: "Das Passwort muss mindestens 8 Zeichen lang sein", // Error message for short password
      },
    }),
  };

  // retrieving of error message for this current field from react-hook-form
  // it's either undefined, when there is no error, of if there is an error, it will be the error message -> string
  const error = errors[name]?.message as string | undefined;

  return (
    <div
      className={`relative mb-10 flex w-full flex-col items-center ${className} max-[640px]:w-2/3 min-[640px]:w-1/2 min-[1240px]:w-1/4`}
    >
      <div className={`relative w-full`}>
        <Typography variant="body">
          <input
            type={type === "password" && showPassword ? "text" : type} // toggle password visibility
            placeholder={placeholder}
            className={`h-12 w-full rounded-md border-2 placeholder:font-figtreeRegular border-${seasonalColor}-dark bg-${seasonalColor}-light px-2 py-2 pr-10 text-sfblack placeholder:text-sfblack placeholder:opacity-60 hover:bg-white focus:bg-transparent min-[900px]:py-6 focus:border-${seasonalColor}-dark`}
            autoComplete={autoComplete}
            {...register(name, validationRules)}
            {...rest}
          />
        </Typography>
        {/* Toggle visibility within the input */}
        {type === "password" && (
          <div
            className="absolute right-3 top-3 cursor-pointer text-sfblack min-[900px]:top-3.5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff size={25} /> : <IoEye size={25} />}
          </div>
        )}
      </div>
      {/* conditional rendering of error message */}
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
