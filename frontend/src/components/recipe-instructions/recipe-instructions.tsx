import { Typography } from "../ui/typography";

interface RecipeInstructionsProps {
  steps: string;
}

export const RecipeInstructions = ({ steps }: RecipeInstructionsProps) => (
  <div className="py-8 min-[640px]:pt-6">
    <Typography variant="heading2">
      <h2 className="text-sfblack">Zubereitung</h2>
    </Typography>
    <Typography variant="body">
      <p className="text-sfblack">{steps}</p>
    </Typography>
  </div>
);
