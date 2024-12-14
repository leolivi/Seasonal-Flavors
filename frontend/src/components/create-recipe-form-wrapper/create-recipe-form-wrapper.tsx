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
import { useEffect, useState } from "react";
import { dataFetch, dataFetchWithToken } from "@/utils/data-fetch";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { IngredientInput } from "../create-recipe-input/ingredient-input";
import { translateSeason } from "@/utils/SeasonUtils";
import { handleImageUpload } from "@/services/recipe/imageUpload";
import { handleCreateRecipe } from "@/services/recipe/recipeCreate";

interface FormField {
  name: keyof CreateRecipeSchema;
  label: string;
  type?: string;
}

interface CreateRecipeFormWrapperProps {
  formFields: FormField[];
}

interface UserData {
  id: string;
  name?: string;
  email?: string;
}

interface Tag {
  id: string;
  name: string;
}

export function CreateRecipeFormWrapper({
  formFields,
}: CreateRecipeFormWrapperProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>();
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
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

  useEffect(() => {
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

        const translatedTags = tagsData.map((tag: Tag) => ({
          id: tag.id,
          name: translateSeason(tag.name),
        }));

        setTags(translatedTags);
      }
    };

    fetchData();
  }, [session, form]);

  const onSubmit = async (data: CreateRecipeSchema) => {
    console.log(data.cover_image);
    const recipeId = await handleCreateRecipe({
      data,
      userData,
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
        <CreateRecipeInput
          fields={singleInputs}
          control={form.control}
          layout="column"
          onFileChange={(fieldName, file) => {
            if (fieldName === "cover_image") {
              setCoverImage(file);
            }
            form.setValue(fieldName, file);
            form.trigger(fieldName);
          }}
        />

        <CreateRecipeInput
          fields={rowInputs}
          control={form.control}
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

        <SeasonCheckbox control={form.control} tags={tags} />

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
