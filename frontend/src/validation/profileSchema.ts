import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];

export const profileSchema = z.object({
  username: z.string().min(1, "Benutzername ist erforderlich"),
  email: z.string().email("Bitte eine gültige E-Mail-Adresse eingeben."),
  profile_image: z
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

export type ProfileSchema = z.infer<typeof profileSchema>;
