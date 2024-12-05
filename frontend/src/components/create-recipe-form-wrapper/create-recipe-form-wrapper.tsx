"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import {
  createRecipeSchema,
  CreateRecipeSchema,
} from "@/validation/createRecipeSchema";
import { SeasonCheckbox } from "../season-checkbox/season-checkbox";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { CreateRecipeInput } from "../create-recipe-input/create-recipe-input";
import { ImageUpload } from "../image-upload/image-upload";

interface FormField {
  name: keyof CreateRecipeSchema;
  label: string;
  placeholder: string;
  type?: string;
}

interface CreateRecipeFormWrapperProps {
  formFields: FormField[];
  seasons: { id: string; label: string }[];
}

export function CreateRecipeFormWrapper({
  formFields,
  seasons,
}: CreateRecipeFormWrapperProps) {
  const router = useRouter();

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      cooking_time: 0,
      prep_time: 0,
      servings: 0,
      steps: "",
      ingredients: "",
      imageSrc: "",
      season: "",
      seasons: [""],
    },
  });

  function onSubmit(data: CreateRecipeSchema) {
    toast({
      title: "Rezept gespeichert",
      description: "Das Rezept wurde erfolgreich erstellt/aktualisiert.",
    });
    console.log("Form Data:", data);
  }

  const singleInputs = formFields.filter(
    (field) => !["cooking_time", "prep_time", "servings"].includes(field.name),
  );

  const rowInputs = formFields.filter((field) =>
    ["cooking_time", "prep_time", "servings"].includes(field.name),
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <CreateRecipeInput
          fields={singleInputs}
          control={form.control}
          layout="column"
        />

        <CreateRecipeInput
          fields={rowInputs}
          control={form.control}
          layout="row"
        />

        <ImageUpload control={form.control} name="picture" label="Titelbild" />

        <SeasonCheckbox control={form.control} seasons={seasons} />

        <div className="flex w-full justify-between">
          <Button
            type="button"
            label="abbrechen"
            style={ButtonStyle.OUTLINERED}
            size={ButtonSize.SMALL}
            onClick={() => router.back()}
          />
          <Button type="submit" label="speichern" size={ButtonSize.SMALL} />
        </div>
      </form>
    </Form>
  );
}
