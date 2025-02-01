"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import { SeasonCheckbox } from "../season-checkbox/season-checkbox";
import { useRouter } from "next/navigation";
import { RecipeInput } from "../create-recipe-input/recipe-input";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { IngredientInput } from "../create-recipe-input/ingredient-input";
import {
  editRecipeSchema,
  EditRecipeSchema,
} from "@/validation/editRecipeSchema";
import { ImageData } from "@/services/image/imageService";
import { Recipe } from "@/services/recipe/recipeService";
import { UserData } from "@/services/user/userService";
import Image from "next/image";
import { handleImageDelete } from "@/services/image/imageDelete";
import { handleImageUpload } from "@/services/image/imageUpload";
import { handleRecipePatch } from "@/services/recipe/recipePatch";
import { getRecipeImage } from "@/services/image/imageService";
import { useRecipesStore } from "@/stores/useRecipesStore";

interface FormField {
  name: keyof EditRecipeSchema;
  label: string;
  type?: string;
}

interface EditRecipeFormProps {
  formFields: FormField[];
  recipeData: Recipe;
  tags: { id: number; name: string }[];
  user: UserData;
}

export default function EditRecipeForm({
  formFields,
  recipeData: initialRecipeData,
  tags,
  user,
}: EditRecipeFormProps) {
  const router = useRouter();
  const updateRecipe = useRecipesStore((state) => state.updateRecipe);
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  const [coverImage, setCoverImage] = useState<File | null>();
  const [imageData, setImageData] = useState<ImageData | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    const fetchImage = async () => {
      if (initialRecipeData?.id) {
        const fetchedImageData = await getRecipeImage(initialRecipeData.id);
        setImageData(fetchedImageData);
      }
    };

    fetchImage();
  }, [initialRecipeData?.id]);

  const form = useForm<EditRecipeSchema>({
    resolver: zodResolver(editRecipeSchema),
    defaultValues: {
      title: initialRecipeData.title || "",
      cooking_time: initialRecipeData.cooking_time,
      prep_time: initialRecipeData.prep_time,
      servings: initialRecipeData.servings,
      steps: JSON.parse(initialRecipeData.steps),
      ingredients: initialRecipeData.ingredients,
      tags: initialRecipeData.season
        ? Array.isArray(initialRecipeData.season)
          ? initialRecipeData.season
          : [Number(initialRecipeData.season)]
        : [],
      cover_image: undefined,
    },
  });

  const onSubmit = async (data: EditRecipeSchema) => {
    const formData = {
      ...data,
      id: initialRecipeData.id,
      servings: data.servings ?? 1,
      ingredients: data.ingredients ?? "",
      steps: JSON.stringify(editorContent),
    };

    const recipeId = initialRecipeData.id;

    if (coverImage) {
      try {
        if (imageData && imageData.id) {
          const deleteResult = await handleImageDelete(
            recipeId,
            imageData.id,
            toast,
          );
          if (!deleteResult) {
            throw new Error("Fehler beim Löschen des alten Bildes");
          }
        }

        const uploadResult = await handleImageUpload(
          recipeId,
          coverImage,
          data.title,
          toast,
        );
        if (!uploadResult) {
          throw new Error("Fehler beim Hochladen des neuen Bildes");
        }

        const updatedImageData = await getRecipeImage(recipeId);
        setImageData(updatedImageData);
      } catch (error) {
        console.error("Fehler bei der Bildverarbeitung:", error);
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Bild konnte nicht aktualisiert werden.",
        });
        return;
      }
    }

    const updatedRecipe = await handleRecipePatch({
      data: formData,
      toast,
      router,
      userData: user,
    });

    if (updatedRecipe) {
      updateRecipe(formData as unknown as Recipe);
    }
  };

  const handleError = (errors: FieldErrors<EditRecipeSchema>) => {
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
        <RecipeInput<EditRecipeSchema>
          fields={singleInputs}
          control={form.control}
          layout="column"
          onFileChange={(fieldName: string, file: File | null) => {
            if (fieldName === "cover_image") {
              setCoverImage(file);
            }
            form.setValue(fieldName as keyof EditRecipeSchema, file);
            form.trigger(fieldName as keyof EditRecipeSchema);
          }}
        />

        {!coverImage && imageData?.file_path && (
          <div className="flex flex-col items-center">
            <Image
              src={imageData.file_path}
              alt={initialRecipeData.title}
              width={100}
              height={100}
              className="static w-1/3 rounded-md object-contain"
            />
          </div>
        )}

        <RecipeInput fields={rowInputs} control={form.control} layout="row" />

        <IngredientInput
          control={form.control}
          name="ingredients"
          defaultValue={initialRecipeData.ingredients}
        />

        <FormField
          control={form.control}
          name="steps"
          render={({ field, fieldState }) => (
            <>
              <TipTapEditor
                content={field.value}
                onContentChange={(newContent) => {
                  setEditorContent(newContent);
                  field.onChange(newContent);
                }}
              />
              <FormMessage>
                {fieldState.error ? fieldState.error.message : null}
              </FormMessage>
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
