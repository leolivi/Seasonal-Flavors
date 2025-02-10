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
import { ProfileSchema, profileSchema } from "@/validation/profileSchema";
import { ProfileCardProps } from "../profile-card/profile-card";
import { useState, useEffect } from "react";
import { ImageData, UserData } from "@/types/interfaces";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { getProfileImage } from "@/services/image/imageService";
import { handleImageDelete } from "@/services/image/imageDelete";
import { handleImageUpload } from "@/services/image/imageUpload";
import { handleUserPatch } from "@/services/user/userPatch";
import { getCurrentUser } from "@/services/user/userService";
import Heart from "../ui/heart";
import { RxCross2 } from "react-icons/rx";
import { ButtonSize } from "@/utils/enum";

type ProfileFormProps = {
  user: NonNullable<ProfileCardProps["userData"]>;
  image: ImageData | undefined;
  onImageUpdate: (newImageData: ImageData | undefined) => void;
  setUserData: (userData: ProfileCardProps["userData"]) => void;
  onUserUpdate: (newUserData: UserData) => void;
};

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
  // get the profile image
  const [profileImage, setProfileImage] = useState<File | null>();
  // get the toast
  const { toast } = useToast();
  // get the form errors
  const [formErrors, setFormErrors] = useState<
    { field: string; message: string }[]
  >([]);
  // get the preview url
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  // check if there are changes
  const hasChanges = (data: ProfileSchema) => {
    return (
      (data.username !== user.username && data.username !== undefined) ||
      (data.email !== user.email && data.email !== undefined) ||
      (data.profile_image !== undefined && data.profile_image !== null)
    );
  };

  // handle the form submission
  async function onSubmit(data: z.infer<typeof profileSchema>) {
    setFormErrors([]);

    if (hasChanges(data)) {
      if (profileImage) {
        try {
          let uploadResult: string | undefined;

          if (image && image.id) {
            const deleteImage = await handleImageDelete(
              user.id,
              image.id,
              toast,
            );
            if (deleteImage) {
              uploadResult = await handleImageUpload(
                user.id,
                profileImage,
                user.username,
                toast,
                "profile",
              );
            }
          } else {
            uploadResult = await handleImageUpload(
              user.id,
              profileImage,
              user.username,
              toast,
              "profile",
            );
          }

          if (uploadResult) {
            setUserData({
              ...user,
              username: data.username,
              email: data.email,
            });
            const updatedImageData = await getProfileImage(user.id);
            onImageUpdate(updatedImageData);
            window.dispatchEvent(new Event("profileImageUpdate"));
            setPreviewUrl(null);
          } else {
            console.error("Bild-Upload fehlgeschlagen");
          }
        } catch (error) {
          console.error("Fehler beim Bild-Upload:", error);
        }
      }

      try {
        const response = await handleUserPatch({
          data: { ...data, id: user.id },
          userData: user,
          toast,
        });

        if (response.errors) {
          setFormErrors(response.errors);
          response.errors.forEach(
            (error: { field: string; message: string }) => {
              form.setError(
                error.field as keyof z.infer<typeof profileSchema>,
                {
                  type: "manual",
                  message: error.message,
                },
              );
            },
          );
        } else if (response.success) {
          const updatedUser = await getCurrentUser(user.accessToken!);
          if (updatedUser) {
            setUserData(updatedUser);
            onUserUpdate(updatedUser);

            toast({
              title: "Daten gespeichert",
              description: "Dein Profil wurde erfolgreich angepasst.",
            });
          }
        }
      } catch (error) {
        console.error("Error during update:", error);
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Dein Profil konnte nicht aktualisiert werden.",
        });
      }
    } else {
      toast({
        title: "Keine Änderungen",
        description: "Es wurden keine Änderungen vorgenommen.",
      });
    }
  }

  // handle the file change
  const handleFileChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setProfileImage(file);
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setProfileImage(null);
    }
  };

  // clear the file input
  const clearFileInput = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setProfileImage(null);
    form.setValue("profile_image", undefined);

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  // render the form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="profile_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profilbild</FormLabel>
              <FormControl>
                <div className="flex flex-col items-center">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        const file = files?.[0] || null;
                        handleFileChange(file);
                        field.onChange(file);
                      }}
                      placeholder="Profilbild hochladen"
                      name={field.name}
                      className="w-full"
                    />
                    {/* clear button only if there is a preview url or a file */}
                    {(previewUrl || field.value) && (
                      <RxCross2
                        size={25}
                        className="m-2 w-6 cursor-pointer text-sfred"
                        onClick={clearFileInput}
                        data-testid="cross-button"
                        aria-label="Clear file input"
                      />
                    )}
                  </div>
                  {/* preview image */}
                  {previewUrl && (
                    <div className="relative mt-2">
                      <Image
                        src={previewUrl}
                        alt="Profilbild Vorschau"
                        width={200}
                        height={200}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="username" />
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
                <Input {...field} placeholder="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
