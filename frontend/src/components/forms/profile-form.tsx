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
import { toast } from "@/hooks/use-toast";
import { Button, ButtonSize } from "../button/button";
import { ProfileSchema, profileSchema } from "@/validation/profileSchema";

interface ProfileFormProps {
  name: string;
  email: string;
}

export default function ProfileForm({ name, email }: ProfileFormProps) {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: name,
      email: email,
    },
  });

  const hasChanges = (data: ProfileSchema) => {
    return data.username !== name || data.email !== email || data.picture;
  };

  function onSubmit(data: z.infer<typeof profileSchema>) {
    if (hasChanges(data)) {
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
          name="picture"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profilbild</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
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
                <Input placeholder={name} {...field} />
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
                <Input placeholder={email} {...field} />
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
