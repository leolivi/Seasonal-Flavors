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
import { Button, ButtonSize } from "../button/button";
import { ProfileSchema, profileSchema } from "@/validation/profileSchema";
import { ProfileCardProps } from "../profile-card/profile-card";
import { useState } from "react";
import { handleUserPatch } from "@/services/user/userPatch";
import { handleImageDelete } from "@/services/image/imageDelete";
import { handleImageUpload } from "@/services/image/imageUpload";
import type { ImageData } from "@/services/image/imageService";
import { useUserImageStore } from "@/stores/userImageStore";
import { Typography } from "../ui/typography";
import Image from "next/image";
import Cross from "@/assets/icons/cross.svg";
import { getProfileImage } from "@/services/image/imageService";
import { useSession } from "next-auth/react";

type ProfileFormProps = {
  user: NonNullable<ProfileCardProps["userData"]>;
  image: ImageData | undefined;
};

export default function ProfileForm({ user, image }: ProfileFormProps) {
  const session = useSession();
  const [profileImage, setProfileImage] = useState<File | null>();
  const { toast } = useToast();
  const { setImageUrl } = useUserImageStore();
  const [formErrors, setFormErrors] = useState<
    { field: string; message: string }[]
  >([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      profile_image: undefined,
    },
  });

  const hasChanges = (data: ProfileSchema) => {
    return (
      (data.username !== user.username && data.username !== undefined) ||
      (data.email !== user.email && data.email !== undefined) ||
      (data.profile_image !== undefined && data.profile_image !== null)
    );
  };

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
            const localImageUrl = URL.createObjectURL(profileImage);
            setImageUrl(localImageUrl);
            const updatedImageData = await getProfileImage(
              user.id,
              session?.data?.accessToken || "",
            );
            setImageUrl(updatedImageData?.imageUrl || localImageUrl);
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
          response.errors.forEach((error) => {
            form.setError(error.field as keyof z.infer<typeof profileSchema>, {
              type: "manual",
              message: error.message,
            });
          });
        } else if (response.success) {
          toast({
            title: "Daten gespeichert",
            description: "Dein Profil wurde erfolgreich angepasst.",
          });
        }
      } catch (error) {
        console.error("Fehler beim Aktualisieren der Benutzerdaten:", error);
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
                  <div className="relative w-full">
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
                    />
                    {(previewUrl || field.value) && (
                      <button
                        type="button"
                        onClick={clearFileInput}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-sfwhite p-1 hover:bg-sfwhite-light"
                      >
                        <Cross
                          className="h-4 w-4 cursor-pointer stroke-sfred-dark stroke-2"
                          aria-label="Close Register Banner"
                        />
                      </button>
                    )}
                  </div>
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
          <Button type="submit" label="speichern" size={ButtonSize.SMALL} />
        </div>
      </form>
    </Form>
  );
}
