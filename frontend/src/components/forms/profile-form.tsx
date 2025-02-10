"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../button/button";
import { profileSchema } from "@/validation/profileSchema";
import { ProfileCardProps } from "../profile-card/profile-card";
import { useState, useEffect } from "react";
import { ImageData, UserData } from "@/types/interfaces";
import { Typography } from "../ui/typography";
import { handleUserPatch } from "@/services/user/userPatch";
import { getCurrentUser } from "@/services/user/userService";
import Heart from "../ui/heart";
import { ButtonSize } from "@/utils/enum";
import { handleFormErrors } from "@/utils/form-error-handler";
import { ProfileImageUpload } from "../file-upload/profile-image-upload";
import { ValidationError, ApiErrors } from "@/utils/form-error-handler";

interface ProfileFormProps {
  user: NonNullable<ProfileCardProps["userData"]>;
  image: ImageData | undefined;
  onImageUpdate: (newImageData: ImageData | undefined) => void;
  setUserData: (userData: ProfileCardProps["userData"]) => void;
  onUserUpdate: (newUserData: UserData) => void;
}

/*
  @desc Profile form
*/
export default function ProfileForm({
  user,
  image,
  onImageUpdate,
  setUserData,
  onUserUpdate,
}: ProfileFormProps) {
  // get the toast
  const { toast } = useToast();
  // get the form errors
  const [formErrors, setFormErrors] = useState<
    { field: string; message: string }[]
  >([]);

  // create the form
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user.username || "",
      email: user.email || "",
    },
    shouldUnregister: true,
  });

  // reset the form
  useEffect(() => {
    form.reset({
      username: user.username || "",
      email: user.email || "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Modify the onSubmit function to remove image handling
  async function onSubmit(data: z.infer<typeof profileSchema>) {
    setFormErrors([]);

    // check if there are changes in username or email only
    if (data.username === user.username && data.email === user.email) {
      toast({
        title: "Keine Änderungen",
        description: "Es wurden keine Änderungen vorgenommen.",
      });
      return;
    }

    try {
      const response = await handleUserPatch({
        data: { ...data, id: user.id },
        userData: user,
      });

      if (response.errors) {
        handleErrors(response.errors, toast);
        return;
      }

      if (response.success) {
        const updatedUser = await getCurrentUser(user.accessToken!);

        if (updatedUser) {
          setUserData(updatedUser);
          onUserUpdate(updatedUser);
        }
        toast({
          variant: "default",
          title: "Erfolgreich!",
          description: "Dein Profil wurde aktualisiert.",
        });
      }
    } catch (error) {
      console.error("Error during update:", error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Dein Profil konnte nicht aktualisiert werden.",
      });
    }
  }

  // handle form errors
  function handleErrors(
    errors: ValidationError | ApiErrors,
    toast: (options: {
      variant: "default" | "destructive";
      title: string;
      description: string;
    }) => void,
  ) {
    handleFormErrors<z.infer<typeof profileSchema>>(errors, {
      toast,
      defaultErrorTitle: "Fehler",
      defaultErrorMessage: "Fehler beim Aktualisieren des Profils.",
    });
  }

  // define the type for the form fields
  type FormFieldConfig = {
    name: keyof z.infer<typeof profileSchema>;
    label: string;
    placeholder: string;
  } & (
    | {
        type: "file";
        accept: string;
        customRender: true;
      }
    | {
        type?: never;
        accept?: never;
        customRender?: never;
      }
  );

  // define the form fields
  const formFields: FormFieldConfig[] = [
    {
      name: "profile_image",
      label: "",
      type: "file",
      placeholder: "Profilbild hochladen",
      accept: "image/*",
      customRender: true,
    },
    {
      name: "username",
      label: "Username",
      placeholder: "username",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "email",
    },
  ];

  // render the form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.customRender ? (
                    <ProfileImageUpload
                      userId={user.id.toString()}
                      currentImage={image}
                      username={user.username}
                      onImageUpdate={onImageUpdate}
                      onUserDataUpdate={(userData) => {
                        setUserData({
                          ...user,
                          imageSrc: userData.imageSrc,
                        });
                      }}
                    />
                  ) : (
                    <Input
                      {...formField}
                      value={formField.value as string}
                      placeholder={field.placeholder}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {/* error message */}
        {formErrors.length > 0 && (
          <div className="font-figtreeRegular text-sfred">
            {formErrors.map((error, index) => (
              <Typography variant="xxs" key={index}>
                <p key={index}>{error.message}</p>
              </Typography>
            ))}
          </div>
        )}
        <div className="flex w-full justify-center">
          {/* submit button */}
          <Button
            type="submit"
            label="speichern"
            size={ButtonSize.SMALL}
            iconLeft={<Heart color="sfred-dark" height={20} />}
          />
        </div>
      </form>
    </Form>
  );
}
