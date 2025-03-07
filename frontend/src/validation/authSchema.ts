import { z } from "zod";

/*
  @desc Schema for authentication
*/
export const authSchema = z
  .object({
    username: z
      .string()
      .min(1, "Benutzername ist erforderlich")
      .max(100, "Benutzername darf maximal 100 Zeichen lang sein")
      .regex(/^[^<>/]*$/, "Benutzername darf keine Sonderzeichen enthalten"),
    email: z
      .string()
      .email("Ungültige E-Mail-Adresse")
      .max(255, "E-Mail-Adresse darf maximal 255 Zeichen lang sein")
      .regex(/^[^<>/]*$/, "E-Mail-Adresse darf keine Sonderzeichen enthalten"),
    password: z
      .string()
      .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
      .regex(/[A-Z]/, "Passwort muss mindestens einen Großbuchstaben enthalten")
      .regex(
        /[a-z]/,
        "Passwort muss mindestens einen Kleinbuchstaben enthalten",
      )
      .regex(/[\W_]/, "Passwort muss mindestens ein Sonderzeichen enthalten")
      .regex(/[0-9]/, "Passwort muss mindestens eine Zahl enthalten"),
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
