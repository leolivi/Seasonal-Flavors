"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Button, ButtonSize, ButtonStyle } from "../button/button";
import {
  createRecipeSchema,
  CreateRecipeSchema,
} from "@/validation/createRecipeSchema";
import { SeasonCheckbox } from "../season-checkbox/season-checkbox";
import { useRouter } from "next/navigation";
import { CreateRecipeInput } from "../create-recipe-input/create-recipe-input";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useEffect, useState } from "react";
import { dataFetch, dataFetchWithToken } from "@/utils/data-fetch";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { IngredientInput } from "../create-recipe-input/ingredient-input";

interface FormField {
  name: keyof CreateRecipeSchema;
  label: string;
  type?: string;
}

interface CreateRecipeFormWrapperProps {
  formFields: FormField[];
}

export function CreateRecipeFormWrapper({
  formFields,
}: CreateRecipeFormWrapperProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  const [userData, setUserData] = useState<any>(null);
  const [coverImage, setCoverImage] = useState<File | undefined>();
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const { toast } = useToast();

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: "",
      cooking_time: null,
      prep_time: null,
      servings: null,
      steps: { type: "doc", content: [] },
      ingredients: ingredients.filter(Boolean).join(", "),
      seasons: [],
      cover_image: null,
    },
  });

  useEffect(() => {
    form.setValue("ingredients", ingredients.filter(Boolean).join(", "));
    const fetchData = async () => {
      if (session?.accessToken) {
        const user = await dataFetchWithToken(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
          session.accessToken,
        );
        setUserData(user);

        const tagsData = await dataFetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tags`,
        );
        setTags(tagsData);
      }
    };

    fetchData();
  }, [session]);

  // function to handle uploading an image to the server
  const handleImageUpload = async (recipeId: string) => {
    if (!coverImage) return null;

    const formData = new FormData();
    formData.append("file", coverImage);
    formData.append("type", "recipe");
    formData.append("recipe_id", recipeId);

    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Bild-Upload fehlgeschlagen.",
        });
        throw new Error(data.message || "Image upload failed");
      }

      return data;
    } catch (error) {
      console.error("Bild-Upload fehlgeschlagen:", error);
      return null;
    }
  };

  const handleCreateRecipe = async (data: CreateRecipeSchema) => {
    if (!userData) {
      console.error("Benutzerdaten sind nicht verfügbar");
      return;
    }

    let recipeId = null;
    let imageId = null;

    try {
      // 1. Create the recipe
      const payload = {
        ...data,
        cooking_time: data.cooking_time,
        prep_time: data.prep_time,
        servings: data.servings,
        steps: JSON.stringify({ type: "doc", content: [] }),
        user_id: userData.id,
        seasons: data.seasons,
        image_id: imageId,
      };

      const response = await fetch("/api/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Fehler",
          description: "Rezept-Erstellung fehlgeschlagen.",
        });
        const error = await response.json();
        console.error("Fehler beim Erstellen des Rezepts:", error);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      recipeId = responseData.id;

      if (coverImage) {
        const uploadedImageResponse = await handleImageUpload(recipeId);

        if (!uploadedImageResponse) {
          console.error("Bild-Upload fehlgeschlagen.");
          return;
        }
      }

      toast({
        variant: "default",
        title: "Erfolgreich!",
        description: "Das Rezept wurde erfolgreich erstellt.",
      });

      router.push("/my-recipes");
    } catch (error) {
      console.error("Rezept-Erstellung fehlgeschlagen:", error);
      toast({
        variant: "destructive",
        title: "Fehler",
        description:
          "Rezept-Erstellung fehlgeschlagen. Bitte erneut versuchen.",
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
        onSubmit={form.handleSubmit(handleCreateRecipe)}
        className="w-full space-y-6"
      >
        <CreateRecipeInput
          fields={singleInputs}
          control={form.control}
          layout="column"
          onFileChange={(fieldName, file) => {
            if (fieldName === "cover_image") {
              setCoverImage(file);
            }
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
          ingredients={ingredients}
          updateIngredient={updateIngredient}
          removeIngredient={removeIngredient}
          addIngredient={addIngredient}
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

        {tags.length > 0 && (
          <SeasonCheckbox control={form.control} tags={tags} />
        )}

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
