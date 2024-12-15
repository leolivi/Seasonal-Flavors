import { CreateRecipeSchema } from "@/validation/createRecipeSchema";
import CreateRecipeForm from "../forms/create-recipe-form";
import EditRecipeForm from "../forms/edit-recipe-form";
import { RecipeData, UserData } from "@/app/recipes/[id]/page";

type FormFieldName = keyof CreateRecipeSchema;

interface FormField {
  name: FormFieldName;
  label: string;
  placeholder: string;
  type?: string;
}

interface CreateRecipeFormWrapperProps {
  recipeData?: RecipeData;
  tags?: { id: number; name: string }[];
  user?: UserData;
}

export default function CreateRecipeFormWrapper({
  recipeData,
  tags,
  user,
}: CreateRecipeFormWrapperProps) {
  const formFields: FormField[] = [
    { name: "title", label: "Rezepttitel", placeholder: "Rezepttitel" },
    {
      name: "cooking_time",
      label: "zubereiten",
      placeholder: "Kochzeit in Minuten",
      type: "number",
    },
    {
      name: "prep_time",
      label: "kochen",
      placeholder: "Vorbereitungszeit in Minuten",
      type: "number",
    },
    {
      name: "servings",
      label: "Portionen",
      placeholder: "Portionen",
      type: "number",
    },
    {
      name: "cover_image",
      label: "Titelbild",
      placeholder: "Titelbild",
      type: "file",
    },
  ];

  return recipeData ? (
    <EditRecipeForm
      formFields={formFields}
      recipeData={recipeData}
      tags={tags || []}
      user={user!}
    />
  ) : (
    <CreateRecipeForm formFields={formFields} />
  );
}
