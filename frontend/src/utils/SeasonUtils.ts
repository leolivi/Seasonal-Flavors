import { Season } from "@/utils/Season";

// Function to get the current Season
export const getCurrentSeason = () => {
  const season = Season.getSeason();
  return season;
};

// Function to get seasons defined color
export const getSeasonColor = (seasonName?: string) => {
  const season = new Season();
  return season.getColor(seasonName);
};
// Function to translate the season name into German
export const translateSeason = (season: string): string => {
  switch (season.toLowerCase()) {
    case "spring":
      return "Frühling";
    case "summer":
      return "Sommer";
    case "autumn":
    case "fall":
      return "Herbst";
    case "winter":
      return "Winter";
    case "all_year":
      return "ganzjährig";
    default:
      return season;
  }
};
