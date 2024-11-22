"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SessionForm } from "@/app/session/page";
import { FormWrapper } from "./form-wrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextInput } from "./text-input";
import { Button, ButtonStyle } from "../button/button";
import { Typography } from "../ui/typography";
import Heart from "../ui/heart";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/loginSchema";
import { useToast } from "@/hooks/use-toast";

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
  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    // handle success of error based on the result
    if (result?.error) {
      setError("Login fehlgeschlagen, bitte versueche es erneut");
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
        setTimeout(() => {
          router.push("/my-recipes");
        }, 2000);
      } else {
        router.push("/my-recipes");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          placeholder="E-mail"
          name="email"
          type="text"
          required
          autoComplete="email"
        />
        <TextInput
          placeholder="Password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
        {error && (
          <Typography variant="small">
            <p className="text-center font-figtreeRegular text-sfred">
              {error}
            </p>
          </Typography>
        )}
        <Button
          type="submit"
          label="anmelden"
          iconLeft={<Heart color="sfred-dark" height={20} />}
        />
        <div className="mb-8 mt-1 flex items-center justify-center gap-1 max-[400px]:flex-col">
          <Typography variant="small">
            <p className="text-sfblack">Du hast noch keinen Account?</p>
          </Typography>
          <Button
            onClick={() => setForm(SessionForm.REGISTER)}
            label="hier registrieren"
            style={ButtonStyle.SIMPLE}
          />
        </div>
      </FormWrapper>
    </FormProvider>
  );
};
