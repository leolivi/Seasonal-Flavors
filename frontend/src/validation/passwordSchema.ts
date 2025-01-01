import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Ungültige E-Mail-Adresse"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
