import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string(),
    email: z.string().email("Ungültige Email-Adresse"),
    password: z
      .string()
      .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
      .regex(/[A-Z]/, "Passwort muss mindestens einen Großbuchstaben enthalten")
      .regex(
        /[a-z]/,
        "Passwort muss mindestens einen Kleinbuchstaben enthalten",
      )
      .regex(/[\W_]/, "Passwort muss mindestens ein Sonderzeichen enthalten"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwörter stimmen nicht überein",
    path: ["password_confirmation"],
  });
