import { Typography } from "../ui/typography";

interface RecipeInstructionsProps {
  steps: string;
}

export const RecipeInstructions = ({ steps }: RecipeInstructionsProps) => {
  let instructions = [];

  try {
    const parsedSteps = JSON.parse(steps);

    if (parsedSteps?.content) {
      instructions = parsedSteps.content.map(
        (item: { type: string; content?: any[] }, index: number) => {
          if (item.type === "paragraph" && item.content) {
            const paragraphContent = item.content.map(
              (innerItem: { text?: string; marks?: any[] }) => {
                if (innerItem.text) {
                  const text = innerItem.marks?.some(
                    (mark) => mark.type === "bold",
                  ) ? (
                    <strong>{innerItem.text}</strong>
                  ) : (
                    innerItem.text
                  );
                  return text;
                }
                return null;
              },
            );

            return (
              <Typography
                variant="body"
                key={index}
                className="font-figtreeRegular text-sfblack"
              >
                <p>{paragraphContent}</p>
              </Typography>
            );
          }

          if (item.type === "heading") {
            return (
              <Typography
                variant="heading2"
                key={index}
                className="text-sfblack"
              >
                {item.content
                  ?.map((innerItem: { text?: string }) => innerItem.text)
                  .join("")}
              </Typography>
            );
          }

          return null;
        },
      );
    }
  } catch (error) {
    console.error("Fehler beim Parsen der Schritte:", error);
    instructions = ["Die Zubereitungsschritte konnten nicht geladen werden."];
  }

  return (
    <div className="py-8 min-[640px]:pt-6">
      <Typography variant="heading2">
        <h2 className="font-figtreeRegular text-sfblack">Zubereitung</h2>
      </Typography>
      <div className="text-sfblack">{instructions}</div>
    </div>
  );
};
