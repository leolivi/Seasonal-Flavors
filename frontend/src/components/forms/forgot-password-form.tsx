"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { forgotPasswordSchema } from "@/validation/passwordSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ButtonSize } from "../button/button";
import { handleForgotPassword } from "@/services/user/PasswordPatch";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Heart from "../ui/heart";

export const ForgotPasswordForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof forgotPasswordSchema>) {
    await handleForgotPassword({
      data: { email: formData.email },
      toast,
      router,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <Button
            type="submit"
            label="Email senden"
            size={ButtonSize.SMALL}
            iconLeft={<Heart color="sfred-dark" height={20} />}
          />
        </div>
      </form>
    </Form>
  );
};
