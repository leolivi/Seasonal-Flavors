"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { SeasonCheckbox } from "../season-checkbox/season-checkbox";
import { useRouter } from "next/navigation";
import { CreateRecipeInput } from "../create-recipe-input/create-recipe-input";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { IngredientInput } from "../create-recipe-input/ingredient-input";
import { handleImageDelete } from "@/services/image/imageDelete";
import { handleImageUpload } from "@/services/image/imageUpload";
import { RecipeData, UserData } from "@/app/recipes/[id]/page";
import {
  editRecipeSchema,
  EditRecipeSchema,
} from "@/validation/editRecipeSchema";
import { handleRecipePatch } from "@/services/recipe/recipePatch";
import { ImageData } from "@/services/image/imageService";

interface FormField {
  name: keyof EditRecipeSchema;
  label: string;
  type?: string;
}

interface EditRecipeFormProps {
  formFields: FormField[];
  recipeData: RecipeData;
  tags: { id: number; name: string }[];
  user: UserData;
  imageData?: ImageData;
}

export default function EditRecipeForm({
  formFields,
  recipeData,
  imageData,
  tags,
  user,
}: EditRecipeFormProps) {
  const router = useRouter();
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  const [coverImage, setCoverImage] = useState<File | null>();
  const { toast } = useToast();

  const form = useForm<EditRecipeSchema>({
    resolver: zodResolver(editRecipeSchema),
    defaultValues: {
      title: recipeData.title,
      cooking_time: recipeData.cooking_time,
      prep_time: recipeData.prep_time,
      servings: recipeData.servings,
      steps: JSON.parse(recipeData.steps),
      ingredients: recipeData.ingredients,
      tags: recipeData.season ? [parseInt(recipeData.season)] : [],
      cover_image: undefined,
    },
  });

  const onSubmit = async (data: EditRecipeSchema) => {
    console.log("Starting form submission");
    const recipeId = recipeData.id;

    if (coverImage) {
      console.log("Handling image update");
      const imageId = imageData?.id;
      console.log("Current image_id:", imageId);

      if (imageId) {
        console.log("Attempting to delete image with:", {
          recipeId,
          imageId,
        });

        const deleteImage = await handleImageDelete(recipeId, imageId, toast);

        if (deleteImage === true) {
          await handleImageUpload(recipeId, coverImage, data.title, toast);
        } else {
          console.error("Image deletion failed");
          toast({
            variant: "destructive",
            title: "Fehler",
            description: "Bild konnte nicht aktualisiert werden.",
          });
        }
      } else {
        await handleImageUpload(recipeId, coverImage, data.title, toast);
      }
    }

    await handleRecipePatch({
      data: { ...data, id: recipeData.id },
      editorContent,
      toast,
      router,
      userData: user,
    });
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
        <CreateRecipeInput<EditRecipeSchema>
          fields={singleInputs}
          control={form.control}
          layout="column"
          onFileChange={(fieldName, file) => {
            if (fieldName === "cover_image") {
              setCoverImage(file);
            }
            form.setValue(fieldName as keyof EditRecipeSchema, file);
            form.trigger(fieldName as keyof EditRecipeSchema);
          }}
        />

        <CreateRecipeInput
          fields={rowInputs}
          control={form.control}
          layout="row"
        />

        <IngredientInput
          control={form.control}
          name="ingredients"
          defaultValue={recipeData.ingredients}
        />

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

        <SeasonCheckbox<EditRecipeSchema>
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
