import { Typography } from "../ui/typography";
import { ReactNode } from "react";

interface RecipeInstructionsProps {
  steps: string;
}

interface ContentItem {
  text?: string;
  marks?: { type: string }[];
}

interface ContentWrapper {
  content: ContentItem[];
}

interface ListItem {
  type: string;
  content: ContentWrapper[];
}

interface StepItem {
  type: string;
  content?: (ContentItem | ContentWrapper)[];
  attrs?: { start?: number };
}

interface ParsedSteps {
  type: string;
  content: StepItem[];
}

/*
  @desc Recipe instructions
*/
export const RecipeInstructions = ({ steps }: RecipeInstructionsProps) => {
  let instructions: ReactNode[] = [];

  // parse the steps into an array
  try {
    const parsedSteps = JSON.parse(steps) as ParsedSteps;

    if (parsedSteps?.content) {
      instructions = parsedSteps.content.map(
        (item: StepItem, index: number) => {
          // Paragraph mit möglichen Formatierungen
          if (item.type === "paragraph" && item.content) {
            const paragraphContent = item.content.map((innerItem) => {
              if ("text" in innerItem) {
                let content: ReactNode = innerItem.text;

                // apply the formatting
                if (innerItem.marks) {
                  innerItem.marks.forEach((mark) => {
                    if (mark.type === "bold") {
                      content = (
                        <strong key={`bold-${innerItem.text}`}>
                          {content}
                        </strong>
                      );
                    }
                    if (mark.type === "italic") {
                      content = (
                        <em key={`italic-${innerItem.text}`}>{content}</em>
                      );
                    }
                  });
                }
                return content;
              }
              return null;
            });

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

          // Bullet List
          if (item.type === "bulletList" && item.content) {
            return (
              <Typography
                variant="body"
                key={index}
                className="font-figtreeRegular text-sfblack"
              >
                <ul className="ml-4 list-disc">
                  {(item.content as ListItem[]).map((listItem, listIndex) => (
                    <li key={listIndex}>
                      {listItem.content?.[0]?.content?.[0]?.text}
                    </li>
                  ))}
                </ul>
              </Typography>
            );
          }

          // Ordered List
          if (item.type === "orderedList" && item.content) {
            return (
              <Typography
                variant="body"
                key={index}
                className="font-figtreeRegular text-sfblack"
              >
                <ol className="ml-4 list-decimal">
                  {(item.content as ListItem[]).map((listItem, listIndex) => (
                    <li key={listIndex}>
                      {listItem.content?.[0]?.content?.[0]?.text}
                    </li>
                  ))}
                </ol>
              </Typography>
            );
          }

          // Überschriften
          if (item.type === "heading" && item.content) {
            return (
              <Typography
                variant="heading2"
                key={index}
                className="text-sfblack"
              >
                {item.content
                  .map((innerItem) => {
                    if ("text" in innerItem) {
                      return innerItem.text;
                    }
                    return "";
                  })
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
      <div className="space-y-4 text-sfblack">{instructions}</div>
    </div>
  );
};
