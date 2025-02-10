import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/*
  @desc clsx function for shadcn components
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
