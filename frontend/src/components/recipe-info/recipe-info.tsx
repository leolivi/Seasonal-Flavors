import { getSeasonColor } from "@/utils/SeasonUtils";
import { Typography } from "../ui/typography";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { LuInfo } from "react-icons/lu";
import { RecipeData } from "@/types/interfaces";

/*
  @desc Recipe info in the recipe page
*/
export const RecipeInfo = ({ ...props }: RecipeData) => {
  // get the ingredients array
  const ingredientsArray = props.ingredients
    .split(",")
    .map((item) => item.trim());

  // get the seasonal color
  const seasonalColor = getSeasonColor();

  // recipe details
  const recipeDetails = [
    {
      label: "vorbereiten",
      value: `${props.prep_time} min`,
      tooltip:
        "Zeit für das Vorbereiten der Zutaten, z.B. Waschen, Schneiden, Abwiegen",
      placeholder: "Vorbereitungszeit in Minuten",
    },
    {
      label: "kochen",
      value: `${props.cooking_time} min`,
      tooltip:
        "Aktive Zeit am Herd oder im Ofen, ohne Vorbereitungs- oder Ruhezeiten",
    },
    {
      label: "Portionen",
      value: props.servings,
      tooltip: "Wie viele Portionen das Rezept ergibt",
    },
  ];

  return (
    <div
      data-testid="recipe-info-container"
      className={`max-w-fit rounded border-2 font-figtreeRegular border-${seasonalColor}-dark bg-${seasonalColor}-light p-4`}
    >
      {/* recipe details */}
      <Typography variant="heading2" className="pt-2">
        <h2 className="text-sfblack">Zutaten</h2>
      </Typography>
      <ul className="max-h-fit w-full pb-4 pt-2">
        <Typography
          variant="small"
          className="flex flex-wrap gap-1 min-[640px]:gap-2"
        >
          {recipeDetails.map((detail, index) => (
            <li
              key={index}
              className={`flex w-fit flex-col items-center rounded bg-sfwhite p-2 text-sfblack`}
            >
              <span className="flex items-center gap-2 font-figtreeMedium">
                {detail.label}
                <TooltipProvider>
                  {detail.tooltip && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className="cursor-pointer">
                          <LuInfo className="cursor-pointer text-sfblack transition-all hover:text-sfred" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{detail.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </span>
              <span>{detail.value}</span>
            </li>
          ))}
        </Typography>
      </ul>

      {/* ingredients */}
      <ul className={`list-disc marker:text-${seasonalColor}-dark}`}>
        {ingredientsArray.map((ingredient, index) => (
          <Typography key={index} variant="body">
            <li key={index} className="ml-6 pb-2 text-sfblack">
              {ingredient}
            </li>
          </Typography>
        ))}
      </ul>
    </div>
  );
};
