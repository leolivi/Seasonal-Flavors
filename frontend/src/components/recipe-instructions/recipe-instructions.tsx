import { Typography } from "../ui/typography";

interface RecipeInstructionsProps {
  steps: string;
}

/*
  @desc Recipe instructions
*/
export const RecipeInstructions = ({ steps }: RecipeInstructionsProps) => {
  let instructions = [];

  // parse the steps into an array
  try {
    const parsedSteps = JSON.parse(steps);

    if (parsedSteps?.content) {
      instructions = parsedSteps.content.map(
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (item: { type: string; content?: any[] }, index: number) => {
          if (item.type === "paragraph" && item.content) {
            const paragraphContent = item.content.map(
              /* eslint-disable @typescript-eslint/no-explicit-any */
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

  // render the instructions
  return (
    <div className="py-8 min-[640px]:pt-6">
      {/* heading */}
      <Typography variant="heading2">
        <h2 className="font-figtreeRegular text-sfblack">Zubereitung</h2>
      </Typography>

      {/* instructions */}
      <div className="text-sfblack">{instructions}</div>
    </div>
  );
};
