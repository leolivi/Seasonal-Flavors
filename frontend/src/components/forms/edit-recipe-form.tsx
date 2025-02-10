"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Button } from "../button/button";
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
import { ImageData, RecipeData, UserData } from "@/types/interfaces";
import Image from "next/image";
import { handleRecipePatch } from "@/services/recipe/recipePatch";
import { getRecipeImage } from "@/services/image/imageService";
import { useRecipes } from "@/hooks/use-recipes";
import Heart from "../ui/heart";
import { ButtonSize, ButtonStyle } from "@/utils/enum";
import { handleFormErrors } from "@/utils/form-error-handler";
import { handleImageUpdate } from "@/utils/image-handler";

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
}

/*
  @desc Edit recipe form
*/
export default function EditRecipeForm({
  formFields,
  recipeData: initialRecipeData,
  tags,
  user,
}: EditRecipeFormProps) {
  // get the router
  const router = useRouter();
  // get the recipes
  const { updateRecipe } = useRecipes();
  // get the toast
  const { toast } = useToast();

  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  // get the image data
  const [imageData, setImageData] = useState<ImageData | undefined>();
  // get the cover image
  const [coverImage, setCoverImage] = useState<File | null>();

  // fetch the image data
  useEffect(() => {
    const fetchImage = async () => {
      if (initialRecipeData?.id) {
        const fetchedImageData = await getRecipeImage(initialRecipeData.id);
        setImageData(fetchedImageData);
      }
    };

    fetchImage();
  }, [initialRecipeData?.id]);

  // create the form
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

  // handle the form submission
  const onSubmit = async (data: EditRecipeSchema) => {
    const formData = {
      ...data,
      id: initialRecipeData.id,
      servings: data.servings ?? 1,
      ingredients: data.ingredients ?? "",
      steps: JSON.stringify(editorContent),
    };

    const recipeId = initialRecipeData.id;

    // Handle cover image upload
    if (coverImage) {
      const success = await handleImageUpdate({
        entityId: recipeId,
        currentImage: imageData,
        newImage: coverImage,
        entityName: data.title,
        type: "recipe",
        toast,
        onSuccess: setImageData,
      });

      if (!success) return;
    }

    // update the recipe
    const updatedRecipe = await handleRecipePatch({
      data: formData,
      toast,
      router,
      userData: user,
      updateRecipe,
    });

    if (updatedRecipe) {
      updateRecipe({
        ...updatedRecipe,
        imageSrc: imageData?.file_path,
        imageAlt: initialRecipeData.title,
        season: data.tags,
      });
    }
  };

  // handle the form errors
  const handleError = (errors: FieldErrors<EditRecipeSchema>) => {
    handleFormErrors(errors, {
      toast,
      defaultErrorTitle: "Validierungsfehler",
      defaultErrorMessage: "Bitte überprüfe die Eingabefelder auf Fehler.",
    });
  };

  // get the single inputs
  const singleInputs = formFields.filter(
    (field) =>
      !["cooking_time", "prep_time", "servings", "steps"].includes(field.name),
  );

  // get the row inputs
  const rowInputs = formFields.filter((field) =>
    ["cooking_time", "prep_time", "servings"].includes(field.name),
  );

  // render the form
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, handleError)}
        className="w-full space-y-6 min-[640px]:w-5/6 min-[1020px]:w-2/3 min-[1240px]:w-1/2"
        noValidate
      >
        {/* single inputs */}
        <RecipeInput<EditRecipeSchema>
          fields={singleInputs}
          control={form.control}
          layout="column"
          onFileChange={(fieldName: string, file: File | null) => {
            if (fieldName === "cover_image") {
              if (file !== null) {
                setCoverImage(file);
              }
            }
            if (file !== null) {
              form.setValue(fieldName as keyof EditRecipeSchema, file);
            }
            form.trigger(fieldName as keyof EditRecipeSchema);
          }}
        />

        {/* cover image */}
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

        {/* row inputs */}
        <RecipeInput fields={rowInputs} control={form.control} layout="row" />

        {/*  ingredient input */}
        <IngredientInput
          control={form.control}
          name="ingredients"
          defaultValue={initialRecipeData.ingredients}
        />

        {/*  steps input */}
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

        {/* season checkbox */}
        <SeasonCheckbox<EditRecipeSchema>
          control={form.control}
          name="tags"
          tags={tags}
        />

        <div className="flex w-full justify-between">
          {/* cancel button */}
          <Button
            type="button"
            label="abbrechen"
            style={ButtonStyle.OUTLINERED}
            size={ButtonSize.SMALL}
            onClick={() => router.back()}
          />
          {/* save button */}
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
