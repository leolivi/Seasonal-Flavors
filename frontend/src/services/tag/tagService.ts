import { translateSeason } from "@/utils/SeasonUtils";
import { TagData } from "@/types/interfaces";

/*
  @desc Get tags
*/
export const getTags = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-tags`,
      {
        cache: "no-store",
      },
    );
    const tagsData = await response.json();
    return tagsData.map((tag: { id: number; name: string }) => ({
      id: tag.id,
      name: translateSeason(tag.name),
    }));
  } catch (error) {
    console.error("Fehler beim Laden der Tags:", error);
    return [];
  }
};

/*
  @desc Get recipe tags
*/
export const getRecipeTags = async (recipeId: number): Promise<TagData[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-tags?recipe_id=${recipeId}`,
      {
        cache: "no-store",
      },
    );
    const tagData = await response.json();
    return tagData;
  } catch (error) {
    console.error("Fehler beim Laden der Recipe Tags:", error);
    return [];
  }
};
