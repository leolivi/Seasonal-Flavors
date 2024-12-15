import { CreateRecipeSchema } from "@/validation/createRecipeSchema";
import CreateRecipeForm from "../forms/create-recipe-form";
import EditRecipeForm from "../forms/edit-recipe-form";

type FormFieldName = keyof CreateRecipeSchema;

interface FormField {
  name: FormFieldName;
  label: string;
  placeholder: string;
  type?: string;
}

interface CreateRecipeFormWrapperProps {
  data?: number;
}

export default function CreateRecipeFormWrapper({
  data,
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

  return data ? (
    <EditRecipeForm formFields={formFields} recipeId={data} />
  ) : (
    <CreateRecipeForm formFields={formFields} />
  );
}
