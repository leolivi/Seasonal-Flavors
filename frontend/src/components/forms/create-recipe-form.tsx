"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import {
  createRecipeSchema,
  CreateRecipeSchema,
} from "@/validation/createRecipeSchema";
import { SeasonCheckbox } from "../season-checkbox/season-checkbox";
import { useRouter } from "next/navigation";
import { CreateRecipeInput } from "../create-recipe-input/create-recipe-input";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IngredientInput } from "../create-recipe-input/ingredient-input";
import { handleImageUpload } from "@/services/image/imageUpload";
import { handleCreateRecipe } from "@/services/recipe/recipeCreate";
import { UserData } from "@/services/user/userService";

interface FormField {
  name: keyof CreateRecipeSchema;
  label: string;
  type?: string;
}

interface CreateRecipeFormProps {
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
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  const [coverImage, setCoverImage] = useState<File | null>();
  const { toast } = useToast();

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      cooking_time: null,
      prep_time: null,
      servings: null,
      steps: { type: "doc", content: [] },
      ingredients: "",
      tags: [],
      cover_image: undefined,
    },
  });

  const onSubmit = async (data: CreateRecipeSchema) => {
    const recipeId = await handleCreateRecipe({
      data,
      userData: user,
      editorContent,
      toast,
      router,
    });

    if (recipeId && coverImage) {
      await handleImageUpload(recipeId, coverImage, data.title, toast);
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 min-[640px]:w-5/6 min-[1020px]:w-2/3 min-[1240px]:w-1/2"
      >
        <CreateRecipeInput<CreateRecipeSchema>
          fields={singleInputs}
          control={form.control}
          layout="column"
          onFileChange={(fieldName, file) => {
            if (fieldName === "cover_image") {
              setCoverImage(file);
            }
            form.setValue(fieldName as keyof CreateRecipeSchema, file);
            form.trigger(fieldName as keyof CreateRecipeSchema);
          }}
        />

        <CreateRecipeInput
          control={form.control}
          fields={rowInputs}
          layout="row"
        />

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
          <Button type="submit" label="speichern" size={ButtonSize.SMALL} />
        </div>
      </form>
    </Form>
  );
}
