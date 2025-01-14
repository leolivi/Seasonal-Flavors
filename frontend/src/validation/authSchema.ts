import { z } from "zod";

export const authSchema = z
  .object({
    username: z.string().min(1, "Benutzername ist erforderlich"),
    email: z.string().email("Ungültige E-Mail-Adresse"),
    password: z.string().min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
    password_confirmation: z
      .string()
      .min(8, "Passwortbestätigung ist erforderlich"),
    acceptDataPolicy: z.literal(true, {
      errorMap: () => ({
        message: "Du musst die Datenschutzerklärung akzeptieren",
      }),
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwörter stimmen nicht überein",
    path: ["password_confirmation"],
  });

export type AuthSchema = z.infer<typeof authSchema>;
