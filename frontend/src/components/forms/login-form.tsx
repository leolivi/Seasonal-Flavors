"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SessionForm } from "@/app/session/page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { Typography } from "../ui/typography";
import Heart from "../ui/heart";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface LoginFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = ({ setForm }: LoginFormProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setError("Login fehlgeschlagen, bitte versuche es erneut");
      console.error(result.error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: result.error,
      });
    } else {
      console.log("Login successful, ", result);
      toast({
        variant: "default",
        title: "Herzlich Willkommen!",
      });
      if (process.env.NODE_ENV !== "test") {
        router.push("/my-recipes");
      } else {
        router.push("/my-recipes");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <Typography variant="small">
            <p className="text-center font-figtreeRegular text-sfred-dark">
              {error}
            </p>
          </Typography>
        )}
        <div className="flex justify-center">
          <Button
            type="submit"
            label="anmelden"
            iconLeft={<Heart color="sfred-dark" height={20} />}
            size={ButtonSize.SMALL}
          />
        </div>
        <div className="mb-8 mt-1 flex items-center justify-center gap-1 max-[400px]:flex-col">
          <Typography variant="small">
            <p className="pr-2 text-sfblack">Du hast noch keinen Account?</p>
          </Typography>
          <Button
            onClick={() => setForm(SessionForm.REGISTER)}
            label="hier registrieren"
            style={ButtonStyle.SIMPLE}
            size={ButtonSize.SMALL}
          />
        </div>
      </form>
    </Form>
  );
};
