import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Bitte eine gültige E-Mail-Adresse eingeben."),
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .regex(/[A-Z]/, "Passwort muss mindestens einen Großbuchstaben enthalten")
    .regex(/[a-z]/, "Passwort muss mindestens einen Kleinbuchstaben enthalten")
    .regex(/[\W_]/, "Passwort muss mindestens ein Sonderzeichen enthalten")
    .regex(/[0-9]/, "Passwort muss mindestens eine Zahl enthalten"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
