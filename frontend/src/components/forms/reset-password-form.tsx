"use client";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { resetPasswordSchema } from "@/validation/resetPasswordSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonSize } from "../button/button";
import { handleResetPassword } from "@/services/user/PasswordPatch";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Heart from "../ui/heart";

export const ResetPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
      email: email || "",
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof resetPasswordSchema>) {
    await handleResetPassword({
      data: formData,
      toast,
      router,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neues Passwort</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Neues Passwort"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort bestätigen</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Passwort bestätigen"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <Button
            type="submit"
            label="Passwort zurücksetzen"
            size={ButtonSize.SMALL}
            iconLeft={<Heart color="sfred-dark" height={20} />}
          />
        </div>
      </form>
    </Form>
  );
};
