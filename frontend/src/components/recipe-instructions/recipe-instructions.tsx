import { Typography } from "../ui/typography";

interface RecipeInstructionsProps {
  steps: string;
}

export const RecipeInstructions = ({ steps }: RecipeInstructionsProps) => {
  let instructions = "";

  try {
    const parsedSteps = JSON.parse(steps);
    if (parsedSteps?.content) {
      instructions = parsedSteps.content
        .map((item: { type: string; content?: { text?: string }[] }) => {
          if (item.type === "paragraph" && item.content) {
            return item.content
              .map((innerItem: { text?: string }) => innerItem.text || "")
              .join("");
          }
          return "";
        })
        .join("\n");
    }
  } catch (error) {
    console.error("Fehler beim Parsen der Schritte:", error);
    instructions = "Die Zubereitungsschritte konnten nicht geladen werden.";
  }

  return (
    <div className="py-8 min-[640px]:pt-6">
      <Typography variant="heading2">
        <h2 className="text-sfblack">Zubereitung</h2>
      </Typography>
      <Typography variant="body">
        <p className="text-sfblack">{instructions}</p>
      </Typography>
    </div>
  );
};
