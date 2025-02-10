/*
  @desc Recipe card layout options
*/
export const CardLayoutOptions = {
  FLEX: "flex pl-4 min-[640px]:p-8 space-x-4 overflow-x-auto",
  GRID: "grid grid-cols-1 gap-4 p-0 min-[640px]:p-4 max-[540px]:grid-cols-1 min-[540px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[1680px]:grid-cols-5",
} as const;

export type CardLayoutOptionType =
  (typeof CardLayoutOptions)[keyof typeof CardLayoutOptions];
