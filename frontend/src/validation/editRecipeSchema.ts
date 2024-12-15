import { z } from "zod";

const MAX_FILE_SIZE = 2000000; // 2MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const editRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Titel ist erforderlich.")
    .max(100, "Titel darf maximal 100 Zeichen lang sein.")
    .optional(),
  cooking_time: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .refine(
      (val) => val === null || (val > 0 && val <= 1440),
      "Kochzeit muss eine positive Zahl sein und darf maximal 1440 Minuten betragen.",
    )
    .optional(),
  prep_time: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .refine(
      (val) => val === null || (val > 0 && val <= 1440),
      "Vorbereitungszeit muss eine positive Zahl sein und darf maximal 1440 Minuten betragen.",
    )
    .optional(),
  servings: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .refine(
      (val) => val === null || (val > 0 && val <= 100),
      "Anzahl der Portionen muss eine positive Zahl sein und maximal 100 betragen.",
    )
    .optional(),
  steps: z
    .object({
      type: z.literal("doc"),
      content: z
        .array(z.any())
        .min(1, "Zubereitungsschritte dürfen nicht leer sein."),
    })
    .refine(
      (value) =>
        value.content.some(
          (node) =>
            node.type === "paragraph" &&
            node.content &&
            node.content.length > 0,
        ),
      {
        message: "Zubereitungsschritte müssen Text enthalten.",
      },
    )
    .optional(),
  ingredients: z
    .string()
    .min(1, "Zutaten sind erforderlich.")
    .max(2000, "Zutaten dürfen maximal 2000 Zeichen lang sein.")
    .optional(),
  tags: z
    .array(z.number())
    .refine((value) => value.some((item) => item), {
      message: "Du musst mindestens eine Saison auswählen.",
    })
    .optional(),
  cover_image: z
    .custom<File | null>()
    .refine((file) => file !== null, "Bild ist erforderlich.")
    .refine(
      (file) => file instanceof File || file === null,
      "Ungültiges Dateiformat",
    )
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Maximale Dateigröße ist ${MAX_FILE_SIZE / 1000000}MB.`,
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: ".jpg, .jpeg, .png, .webp und .svg Dateien sind akzeptiert.",
    })
    .optional(),
});

export type EditRecipeSchema = z.infer<typeof editRecipeSchema>;
