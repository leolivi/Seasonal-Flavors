"use client";

import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { Dispatch, SetStateAction } from "react";
import { FormWrapper } from "./form-wrapper";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { handleSignup, SignUpResponse } from "@/actions/auth-actions";
import { TextInput } from "./text-input";
import { Button, ButtonStyle } from "../button/button";
import { Typography } from "../ui/typography";
import Heart from "../ui/heart";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../toaster/toast";
import { authSchema, AuthSchema } from "@/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface RegisterFormInputs {
  email: string;
  password: string;
  username: string;
  acceptDataPolicy: boolean;
}

export const RegisterForm = ({ setForm }: RegisterFormProps) => {
  const methods = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // call the server action 'handleSignup' and await the response
    const response: SignUpResponse = await handleSignup(
      data.email,
      data.password,
      data.username,
    );

    // if the response is successful console.log the response
    if (response.status === 201) {
      console.log("Signup successful: ", response);
      toast({
        variant: "default",
        title: "Erfolgreich registriert",
        description: "Du kannst dich jetzt anmelden.",
        action: (
          <ToastAction
            onClick={() => setForm(SessionForm.LOGIN)}
            altText="Go to login page"
          >
            Login
          </ToastAction>
        ),
      });
      setTimeout(() => {
        setForm(SessionForm.LOGIN);
      }, 2000);
    } else {
      // If there's an error, set the errors in the form
      if (Array.isArray(response.errors)) {
        response.errors.forEach((error) => {
          methods.setError(error.field as keyof RegisterFormInputs, {
            type: "manual",
            message: error.message,
          });
        });
      } else if (
        typeof response.errors === "object" &&
        response.errors !== null
      ) {
        // Handle object format errors (e.g., { email: "Invalid email" })
        Object.entries(response.errors).forEach(([field, message]) => {
          methods.setError(field as keyof RegisterFormInputs, {
            type: "manual",
            message: message as string,
          });
        });
      } else if (typeof response.errors === "string") {
        console.log("Error message: ", response.errors);
        toast({
          variant: "destructive",
          title: "Fehler",
          description: response.errors,
        });
      } else {
        console.log("Signup failed: ", response);
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Unbekannter Fehler.",
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <FormWrapper onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Username"
          name="username"
          type="text"
          required
        />
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
        <div className="justify-left flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="checkbox"
              className="h-6 w-6 appearance-none rounded-sm border-2 border-sfred-dark bg-sfwhite accent-sfgreen checked:appearance-auto checked:border-0 checked:bg-sfgreen"
              id="acceptDataPolicy"
              {...methods.register("acceptDataPolicy", {
                required: "Bitte bestätige die Datenschutzerklärung",
              })}
            />
            <Typography variant="small">
              <label
                htmlFor="acceptDataPolicy"
                className="font-figtreeRegular text-sfblack"
              >
                Ich akzeptiere die{" "}
                <a
                  href="/datenschutz"
                  className="font-figtreeRegular text-sfred"
                >
                  Datenschutzerklärung
                </a>
              </label>
            </Typography>
          </div>
          {methods.formState.errors.acceptDataPolicy && (
            <Typography variant="small">
              <p className="text-sfred">
                {methods.formState.errors.acceptDataPolicy.message}
              </p>
            </Typography>
          )}
        </div>
        <Button
          type="submit"
          label="registrieren"
          iconLeft={<Heart color="sfred-dark" height={20} />}
        />
        <div className="mb-8 flex items-center justify-center gap-1 max-[400px]:flex-col">
          <Typography variant="small">
            <p className="text-sfblack">Du bist bereits registriert?</p>
          </Typography>
          <Button
            onClick={() => setForm(SessionForm.LOGIN)}
            label="hier anmelden"
            style={ButtonStyle.SIMPLE}
          />
        </div>
      </FormWrapper>
    </FormProvider>
  );
};
