import { z } from "zod";

const MAX_FILE_SIZE = 2000000; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const createRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Titel ist erforderlich.")
    .max(100, "Titel darf maximal 100 Zeichen lang sein."),
  cooking_time: z
    .number()
    .positive("Kochzeit muss eine positive Zahl sein.")
    .max(1440, "Kochzeit darf maximal 1440 Minuten betragen."),
  prep_time: z
    .number()
    .positive("Vorbereitungszeit muss eine positive Zahl sein.")
    .max(1440, "Vorbereitungszeit darf maximal 1440 Minuten betragen."),
  servings: z
    .number()
    .positive("Anzahl der Portionen muss eine positive Zahl sein.")
    .max(100, "Maximale Anzahl der Portionen ist 100."),
  steps: z
    .string()
    .min(1, "Zubereitungsschritte sind erforderlich.")
    .max(5000, "Zubereitungsschritte dürfen maximal 5000 Zeichen lang sein."),
  ingredients: z
    .string()
    .min(1, "Zutaten sind erforderlich.")
    .max(2000, "Zutaten dürfen maximal 2000 Zeichen lang sein."),
  imageSrc: z.string().url("Bildquelle muss eine gültige URL sein."),
  season: z
    .string()
    .refine(
      (val) => !val || ["Winter", "Spring", "Summer", "Autumn"].includes(val),
      "Ungültige Saison. Erlaubt sind 'Winter', 'Spring', 'Summer', 'Autumn'.",
    ),
  picture: z
    .any()
    .nullable()
    .refine((file) => file instanceof File || file === null, {
      message: "Ein Bild ist erforderlich.",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Maximale Dateigröße ist ${MAX_FILE_SIZE / 1000000}MB.`,
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: ".jpg, .jpeg, .png, .webp und .svg Dateien sind akzeptiert.",
    }),
  seasons: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Du musst mindestens eine Saison auswählen.",
  }),
});

export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
