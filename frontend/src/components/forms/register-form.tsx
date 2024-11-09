"use client";

import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { Dispatch, SetStateAction } from "react";
import { FormWrapper } from "./form-wrapper";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { handleSignup } from "@/actions/auth-actions";
import { TextInput } from "./text-input";
import { Button } from "../button/button";

interface RegisterFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface RegisterFormInputs {
  email: string;
  password: string;
  username: string;
}

export const RegisterForm = ({ setForm }: RegisterFormProps) => {
  const methods = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
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
        />
        <TextInput
          placeholder="Password"
          name="password"
          type="password"
          required
          validateAs="password"
        />
        <div className="-mt-6 flex justify-end gap-1">
          <p>Already a member?</p>
          <Button
            onClick={() => setForm(SessionForm.LOGIN)}
            label="Login now"
          />
        </div>
        <Button type="submit" label="register" />
      </FormWrapper>
    </FormProvider>
  );
};
