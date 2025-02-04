"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldErrors } from "react-hook-form";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import {
  createRecipeSchema,
  CreateRecipeSchema,
} from "@/validation/createRecipeSchema";
import { SeasonCheckbox } from "../season-checkbox/season-checkbox";
import { useRouter } from "next/navigation";
import { RecipeInput } from "../create-recipe-input/recipe-input";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IngredientInput } from "../create-recipe-input/ingredient-input";
import { handleCreateRecipe } from "@/services/recipe/recipeCreate";
import { UserData } from "@/services/user/userService";
import { handleImageUpload } from "@/services/image/imageUpload";
import { useRecipes } from "@/hooks/use-recipes";
import Heart from "../ui/heart";

interface FormField {
  name: keyof CreateRecipeSchema;
  label: string;
  type?: string;
}

export interface CreateRecipeFormProps {
  formFields: FormField[];
  tags: { id: number; name: string }[];
  user: UserData;
}

export default function CreateRecipeForm({
  formFields,
  tags,
  user,
}: CreateRecipeFormProps) {
  const router = useRouter();
  const { addRecipe } = useRecipes();
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  const [coverImage, setCoverImage] = useState<File | null>();
  const { toast } = useToast();

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      cooking_time: undefined,
      prep_time: undefined,
      servings: undefined,
      steps: { type: "doc", content: [] },
      ingredients: "",
      tags: [],
      cover_image: undefined,
    },
  });

  const onSubmit = async (data: CreateRecipeSchema) => {
    const formData = {
      ...data,
      steps: JSON.stringify(editorContent),
    };

    const recipeId = await handleCreateRecipe({
      data: formData,
      userData: user,
      toast,
      router,
      addRecipe,
    });

    if (recipeId && coverImage) {
      await handleImageUpload(recipeId, coverImage, data.title, toast);
    }
  };

  const handleError = (errors: FieldErrors<CreateRecipeSchema>) => {
    if (Object.keys(errors).length > 0) {
      toast({
        variant: "destructive",
        title: "Validierungsfehler",
        description: "Bitte überprüfe die Eingabefelder auf Fehler.",
      });
    }
  };

  const singleInputs = formFields.filter(
    (field) =>
      !["cooking_time", "prep_time", "servings", "steps"].includes(field.name),
  );

  const rowInputs = formFields.filter((field) =>
    ["cooking_time", "prep_time", "servings"].includes(field.name),
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, handleError)}
        className="w-full space-y-6 min-[640px]:w-5/6 min-[1020px]:w-2/3 min-[1240px]:w-1/2"
        noValidate
      >
        <RecipeInput<CreateRecipeSchema>
          fields={singleInputs}
          control={form.control}
          layout="column"
          onFileChange={(fieldName, file) => {
            if (fieldName === "cover_image") {
              setCoverImage(file);
            }
            if (file) {
              form.setValue(fieldName as keyof CreateRecipeSchema, file);
              form.trigger(fieldName as keyof CreateRecipeSchema);
            }
          }}
        />

        <RecipeInput control={form.control} fields={rowInputs} layout="row" />

        <IngredientInput control={form.control} name="ingredients" />

        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <>
              <TipTapEditor
                content={field.value}
                onContentChange={(newContent) => {
                  setEditorContent(newContent);
                  field.onChange(newContent);
                }}
              />
              <FormMessage />
            </>
          )}
        />

        <SeasonCheckbox<CreateRecipeSchema>
          control={form.control}
          name="tags"
          tags={tags}
        />

        <div className="flex w-full justify-between">
          <Button
            type="button"
            label="abbrechen"
            style={ButtonStyle.OUTLINERED}
            size={ButtonSize.SMALL}
            onClick={() => router.back()}
          />
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
