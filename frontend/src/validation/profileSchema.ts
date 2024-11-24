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
  picture: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= MAX_FILE_SIZE,
      `Maximale Dateigrösse ist 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      ".jpg, .jpeg, .png, .webp und .svg Dateien sind akzeptiert.",
    ),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
