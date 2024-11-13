import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(1, "Benutzername ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .regex(/[A-Z]/, "Passwort muss mindestens einen Großbuchstaben enthalten")
    .regex(/[a-z]/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .regex(/[\W_]/, "Passwort muss mindestens ein Sonderzeichen enthalten"),
  acceptDataPolicy: z.literal(true, {
    errorMap: () => ({
      message: "Du musst die Datenschutzerklärung akzeptieren",
    }),
  }),
});

export type AuthSchema = z.infer<typeof authSchema>;
