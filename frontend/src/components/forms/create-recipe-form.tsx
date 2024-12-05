import { CreateRecipeFormWrapper } from "../create-recipe-form-wrapper/create-recipe-form-wrapper";
import { CreateRecipeSchema } from "@/validation/createRecipeSchema";

type FormFieldName = keyof CreateRecipeSchema;

interface FormField {
  name: FormFieldName;
  label: string;
  placeholder: string;
  type?: string;
}

export default async function CreateRecipeForm() {
  const seasons = [
    { id: "spring", label: "Frühling" },
    { id: "summer", label: "Sommer" },
    { id: "autumn", label: "Herbst" },
    { id: "winter", label: "Winter" },
    { id: "all_year", label: "ganzjährig" },
  ];

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
    { name: "ingredients", label: "Zutaten", placeholder: "Zutaten" },
    {
      name: "steps",
      label: "Zubereitungsschritte",
      placeholder: "Schritte beschreiben",
    },
  ];

  return <CreateRecipeFormWrapper formFields={formFields} seasons={seasons} />;
}
