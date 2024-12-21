import { dataFetch } from "@/lib/data-fetch";
import { translateSeason } from "@/utils/SeasonUtils";

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
