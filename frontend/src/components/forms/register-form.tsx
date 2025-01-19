"use client";

import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { handleSignup, SignUpResponse } from "@/actions/auth-actions";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { Typography } from "../ui/typography";
import Heart from "../ui/heart";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../toaster/toast";
import { authSchema, AuthSchema } from "@/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { SessionForm } from "@/utils/enum";

interface RegisterFormProps {
  setForm: Dispatch<SetStateAction<SessionForm>>;
}

interface RegisterFormInputs {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  acceptDataPolicy: boolean;
}

export const RegisterForm = ({ setForm }: RegisterFormProps) => {
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (data.password !== data.password_confirmation) {
      form.setError("password_confirmation", {
        type: "manual",
        message: "Passwörter stimmen nicht überein",
      });
      return;
    }

    const response: SignUpResponse = await handleSignup(
      data.email,
      data.password,
      data.username,
    );

    if (response.status === 201) {
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
      if (Array.isArray(response.errors)) {
        response.errors.forEach((error) => {
          form.setError(error.field as keyof RegisterFormInputs, {
            type: "manual",
            message: error.message,
          });
        });
      } else if (
        typeof response.errors === "object" &&
        response.errors !== null
      ) {
        Object.entries(response.errors).forEach(([field, message]) => {
          form.setError(field as keyof RegisterFormInputs, {
            type: "manual",
            message: message as string,
          });
        });
      } else if (typeof response.errors === "string") {
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Fehler beim Registrieren.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Unbekannter Fehler.",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" autoComplete="off" {...field} />
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
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="acceptDataPolicy"
            {...form.register("acceptDataPolicy", { required: true })}
            className="h-6 w-6 appearance-none rounded-sm border-2 border-sfred bg-sfwhite accent-sfgreen checked:appearance-auto checked:border-0 checked:bg-sfgreen"
          />
          <label
            htmlFor="acceptDataPolicy"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Ich akzeptiere die{" "}
            <a
              href="/data-protection"
              className="font-figtreeRegular text-sfred-dark"
            >
              Datenschutzerklärung
            </a>
          </label>
        </div>

        {/* Error message for Data Policy */}
        {form.formState.errors.acceptDataPolicy && (
          <Typography variant="xxs">
            <p className="font-figtreeRegular text-sfred">
              {form.formState.errors.acceptDataPolicy.message}
            </p>
          </Typography>
        )}

        <div className="flex justify-center">
          <Button
            type="submit"
            label="registrieren"
            iconLeft={<Heart color="sfred-dark" height={20} />}
            size={ButtonSize.SMALL}
          />
        </div>

        <div className="mb-8 flex items-center justify-center gap-1 max-[400px]:flex-col">
          <Typography variant="small">
            <p className="pr-2 text-sfblack">Du bist bereits registriert?</p>
          </Typography>

          <Button
            onClick={() => setForm(SessionForm.LOGIN)}
            label="hier anmelden"
            style={ButtonStyle.SIMPLE}
            size={ButtonSize.SMALL}
          />
        </div>
      </form>
    </Form>
  );
};
