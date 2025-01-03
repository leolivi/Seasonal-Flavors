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
import { useRouter } from "next/navigation";
import { handleUserPatch } from "@/services/user/userPatch";
import { handleImageDelete } from "@/services/image/imageDelete";
import { handleImageUpload } from "@/services/image/imageUpload";
import type { ImageData } from "@/services/image/imageService";
import { useUserImageStore } from "@/stores/userImageStore";

type ProfileFormProps = {
  user: NonNullable<ProfileCardProps["userData"]>;
  image: ImageData | undefined;
};

export default function ProfileForm({ user, image }: ProfileFormProps) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>();
  const { toast } = useToast();
  const { setImageUrl } = useUserImageStore();

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
      data.username !== user.username ||
      data.email !== user.email ||
      data.profile_image !== undefined
    );
  };

  async function onSubmit(data: z.infer<typeof profileSchema>) {
    console.log("Form submitted with data:", data);
    if (hasChanges(data)) {
      if (profileImage) {
        try {
          if (image && image.id) {
            const deleteImage = await handleImageDelete(
              user.id,
              image.id,
              toast,
            );

            if (deleteImage === true) {
              const uploadResult = await handleImageUpload(
                user.id,
                profileImage,
                user.username,
                toast,
                "profile",
              );

              if (uploadResult) {
                // TODO: find another solution? depeding on "http://127.0.0.1:8000" rn...
                const apiUrl =
                  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
                const fullImageUrl = `${apiUrl}/uploads/${uploadResult}`;
                setImageUrl(fullImageUrl);
                router.refresh();
              } else {
                console.error("Upload Result ist leer");
              }
            }
          } else {
            const uploadResult = await handleImageUpload(
              user.id,
              profileImage,
              user.username,
              toast,
              "profile",
            );

            if (uploadResult) {
              const apiUrl =
                process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
              const fullImageUrl = `${apiUrl}/uploads/${uploadResult}`;

              setImageUrl(fullImageUrl);
              router.refresh();
            } else {
              console.error("Upload Result ist leer");
            }
          }
        } catch (error) {
          console.error("Fehler beim Bild-Upload:", error);
        }
      }

      await handleUserPatch({
        data: { ...data, id: user.id },
        userData: user,
        toast,
        router,
      });

      toast({
        title: "Daten gespeichert",
        description: "Dein Profil wurde erfolgreich angepasst.",
      });
    } else {
      toast({
        title: "Keine Änderungen",
        description: "Es wurden keine Änderungen vorgenommen.",
      });
    }
  }

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
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      console.log("File selected:", files[0]);
                      setProfileImage(files[0]);
                      field.onChange(files[0]);
                    }
                  }}
                  placeholder="Profilbild hochladen"
                  name={field.name}
                />
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
                <Input {...field} placeholder="Username" />
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
                <Input {...field} placeholder="Email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-center">
          <Button type="submit" label="speichern" size={ButtonSize.SMALL} />
        </div>
      </form>
    </Form>
  );
}
