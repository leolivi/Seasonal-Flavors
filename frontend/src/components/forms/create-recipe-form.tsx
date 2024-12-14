import { CreateRecipeSchema } from "@/validation/createRecipeSchema";
import CreateRecipeFormWrapper from "../create-recipe-form-wrapper/create-recipe-form-wrapper";

type FormFieldName = keyof CreateRecipeSchema;

interface FormField {
  name: FormFieldName;
  label: string;
  placeholder: string;
  type?: string;
}

export default async function CreateRecipeForm() {
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

  return <CreateRecipeFormWrapper formFields={formFields} />;
}
