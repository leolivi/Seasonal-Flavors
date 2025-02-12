"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../button/button";
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
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ButtonSize, ButtonStyle, SessionForm } from "@/utils/enum";
import { trackAction } from "@/components/analytics/action-tracker";

interface LoginFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

/*
  @desc Login form
*/
export const LoginForm = ({ setForm }: LoginFormProps) => {
  // get the router
  const router = useRouter();
  // get the error state
  const [error, setError] = useState<string | null>(null);
  // get the toast
  const { toast } = useToast();
  // create the form
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  // handle the form submission
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
        description: "Login fehlgeschlagen, bitte versuche es erneut.",
      });
    } else {
      // Track successful login
      trackAction("login", {
        method: "credentials",
        timestamp: new Date().toISOString(),
      });

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

  // render the form
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
                <Input placeholder="Email" autoComplete="email" {...field} />
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
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Passwort"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* error message */}
        {error && (
          <Typography variant="xs">
            <p className="mt-4 text-center font-figtreeRegular text-sfred">
              {error}
            </p>
          </Typography>
        )}
        <div className="flex justify-center">
          {/* submit button */}
          <Button
            type="submit"
            label="anmelden"
            iconLeft={<Heart color="sfred-dark" height={20} />}
            size={ButtonSize.SMALL}
          />
        </div>
        {/* register button */}
        <div className="mb-2 mt-1 flex items-center justify-center gap-1 max-[400px]:flex-col">
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
        {/* forgot password button */}
        <div style={{ marginBottom: "2rem" }} className="flex justify-center">
          <Button
            onClick={() => router.push("/forgot-password")}
            label="Passwort vergessen?"
            style={ButtonStyle.SIMPLERED}
            size={ButtonSize.XS}
          />
        </div>
      </form>
    </Form>
  );
};
