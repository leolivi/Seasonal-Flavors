"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { FormWrapper } from "./form-wrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextInput } from "./text-input";
import { Button, ButtonStyle } from "../button/button";
import { Typography } from "../ui/typography";
import Heart from "../ui/heart";

interface LoginFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = ({ setForm }: LoginFormProps) => {
  const router = useRouter();
  const methods = useForm<LoginFormInputs>();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError(null);

    // we define here, that we will use next-auth's handleLogin
    // the handleLogin function of next-auth is called signIn()
    const result = await signIn("credentials", {
      redirect: false, // prevents the automatic redirect
      email: data.email,
      password: data.password,
    });

    // handle success of error based on the result
    if (result?.error) {
      setError("Login fehlgeschlagen, bitte versueche es erneut");
      console.error(result.error);
    } else {
      console.log("Login successful, ", result);
      router.push("/dashboard");
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
          validateAs="email"
          autoComplete="email"
        />
        <TextInput
          placeholder="Password"
          name="password"
          type="password"
          required
          validateAs="password"
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
