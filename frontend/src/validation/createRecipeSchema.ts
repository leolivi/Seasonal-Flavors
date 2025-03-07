import { z } from "zod";

export const MAX_FILE_SIZE = 2000000; // 2MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/JPG",
  "image/png",
];

/*
  @desc Schema for creating a recipe
*/
export const createRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Titel ist erforderlich.")
    .max(100, "Titel darf maximal 100 Zeichen lang sein.")
    .regex(/^[^<>/]*$/, "Titel darf keine Sonderzeichen enthalten"),
  cooking_time: z
    .number({
      required_error: "Kochzeit ist erforderlich.",
      invalid_type_error: "Kochzeit muss eine Zahl sein.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Kochzeit ist erforderlich.",
    })
    .refine((val) => val !== null && val > 0 && val <= 200, {
      message:
        "Kochzeit muss eine positive Zahl sein und darf maximal 200 Minuten betragen.",
    }),
  prep_time: z
    .number({
      required_error: "Vorbereitungszeit ist erforderlich.",
      invalid_type_error: "Vorbereitungszeit muss eine Zahl sein.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Vorbereitungszeit ist erforderlich.",
    })
    .refine((val) => val !== null && val > 0 && val <= 200, {
      message:
        "Vorbereitungszeit muss eine positive Zahl sein und darf maximal 200 Minuten betragen.",
    }),
  servings: z
    .number({
      required_error: "Anzahl der Portionen ist erforderlich.",
      invalid_type_error: "Anzahl der Portionen muss eine Zahl sein.",
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Anzahl der Portionen ist erforderlich.",
    })
    .refine((val) => val !== null && val > 0 && val <= 100, {
      message:
        "Anzahl der Portionen muss eine positive Zahl sein und maximal 100 betragen.",
    }),
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
    ),
  ingredients: z
    .string()
    .min(1, "Zutaten sind erforderlich.")
    .max(2000, "Zutaten dürfen maximal 2000 Zeichen lang sein.")
    .regex(/^[^<>/]*$/, "Zutaten darf keine Sonderzeichen enthalten"),
  tags: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Du musst mindestens eine Saison auswählen.",
  }),
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
      message: ".jpg, .jpeg, .png, .JPG Dateien sind akzeptiert.",
    }),
});

export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
