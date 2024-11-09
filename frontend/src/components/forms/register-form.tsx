"use client";

import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { Dispatch, SetStateAction } from "react";
import { FormWrapper } from "./form-wrapper";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { handleSignup } from "@/actions/auth-actions";
import { TextInput } from "./text-input";
import { Button, ButtonStyle } from "../button/button";
import { Typography } from "../ui/typography";
import Heart from "../ui/heart";

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
  const methods = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    // ensure data.policy is checked
    if (!data.acceptDataPolicy) {
      console.log("You must accept the data policy.");
      return;
    }

    // call the server action 'handleSignup' and await the response
    const response = await handleSignup(
      data.email,
      data.password,
      data.username,
    );

    // if the response is successful console.log the response
    if (response.status === 201) {
      console.log("Signup successful: ", response);
    } else {
      console.log("Signup failed: ", response);
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
          validateAs="text"
        />
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
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-6 w-6 appearance-none rounded-sm border-2 border-sfred-dark bg-sfwhite accent-sfgreen checked:appearance-auto checked:border-0 checked:bg-sfgreen"
            id="acceptDataPolicy"
            {...methods.register("acceptDataPolicy", {
              required: "You must accept the data policy",
            })}
          />
          <Typography variant="small">
            <label
              htmlFor="acceptDataPolicy"
              className="font-figtreeRegular text-sfblack"
            >
              Ich akzeptiere die{" "}
              <a href="/datenschutz" className="font-figtreeRegular text-sfred">
                Datenschutzerklärung
              </a>
            </label>
          </Typography>
        </div>
        {methods.formState.errors.acceptDataPolicy && (
          <p className="text-sm text-sfred">
            {methods.formState.errors.acceptDataPolicy.message}
          </p>
        )}
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
