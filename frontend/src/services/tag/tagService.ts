import { dataFetch } from "@/utils/data-fetch";
import { translateSeason } from "@/utils/SeasonUtils";

export interface TagData {
  name: string;
  id: number;
}

export const getTags = async () => {
  try {
    const tagsData = await dataFetch(`${process.env.BACKEND_URL}/api/tags`);
    return tagsData.map((tag: { id: number; name: string }) => ({
      id: tag.id,
      name: translateSeason(tag.name),
    }));
  } catch (error) {
    console.error("Fehler beim Laden der Tags:", error);
    return [];
  }
};

export const getRecipeTags = async (recipeId: number): Promise<TagData[]> => {
  try {
    const tagData = await dataFetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recipes/${recipeId}/tags`,
    );
    return tagData;
  } catch (error) {
    console.error("Fehler beim Laden der Recipe Tags:", error);
    return [];
  }
};
