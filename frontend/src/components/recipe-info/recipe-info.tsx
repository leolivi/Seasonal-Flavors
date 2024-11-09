import { getSeasonColor } from "@/utils/SeasonUtils";
import { Typography } from "../ui/typography";

interface RecipeInfoProps {
  prepTime: number;
  cookingTime: number;
  servings: number;
  ingredients: string;
}

export const RecipeInfo = ({ ...props }: RecipeInfoProps) => {
  const ingredientsArray = props.ingredients
    .split(",")
    .map((item) => item.trim());

  const seasonalColor = getSeasonColor();

  const recipeDetails = [
    { label: "zubereiten", value: `${props.prepTime} min` },
    { label: "kochen", value: `${props.cookingTime} min` },
    { label: "Portionen", value: props.servings },
  ];

  return (
    <div
      data-testid="recipe-info-container"
      className={`max-w-fit rounded border-2 border-${seasonalColor} bg-${seasonalColor}-light p-4`}
    >
      <Typography variant="heading2" className="pt-2">
        <h2 className="text-sfblack">Zutaten</h2>
      </Typography>
      <ul className="main-w-fit max-h-fit pb-4 pt-2">
        <Typography variant="small" className="flex gap-2">
          {recipeDetails.map((detail, index) => (
            <li
              key={index}
              className="flex flex-col items-center rounded bg-sfwhite p-2 text-sfblack"
            >
              {detail.label} <span>{detail.value}</span>
            </li>
          ))}
        </Typography>
      </ul>
      <ul className={`list-disc marker:text-${seasonalColor}-dark`}>
        {ingredientsArray.map((ingredient, index) => (
          <Typography variant="body">
            <li key={index} className="ml-6 pb-2 text-sfblack">
              {ingredient}
            </li>
          </Typography>
        ))}
      </ul>
    </div>
  );
};
