import { CreateRecipeSchema } from "@/validation/createRecipeSchema";
import CreateRecipeForm from "../forms/create-recipe-form";
import EditRecipeForm from "../forms/edit-recipe-form";
import { RecipeData, UserData } from "@/types/interfaces";

type FormFieldName = keyof CreateRecipeSchema;

export interface FormField {
  name: FormFieldName;
  label: string;
  tooltip?: string;
  placeholder?: string;
  type?: string;
}

interface RecipeFormWrapperProps {
  recipeData?: RecipeData;
  tags: { id: number; name: string }[];
  user: UserData;
  imageData?: ImageData;
}

/*
  @desc Recipe form wrapper
*/
export default function RecipeFormWrapper({
  recipeData,
  tags,
  user,
}: RecipeFormWrapperProps) {
  // form fields
  const formFields: FormField[] = [
    { name: "title", label: "Rezepttitel", placeholder: "Rezepttitel" },
    {
      name: "prep_time",
      label: "vorbereiten (min)",
      tooltip:
        "Zeit für das Vorbereiten der Zutaten, z.B. Waschen, Schneiden, Abwiegen",
      placeholder: "Vorbereitungszeit in Minuten",
      type: "number",
    },
    {
      name: "cooking_time",
      label: "kochen (min)",
      tooltip:
        "Aktive Zeit am Herd oder im Ofen, ohne Vorbereitungs- oder Ruhezeiten",
      placeholder: "Kochzeit in Minuten",
      type: "number",
    },
    {
      name: "servings",
      label: "Portionen",
      tooltip: "Wie viele Portionen das Rezept ergibt",
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

  // render the edit recipe form if recipe data is available
  return recipeData ? (
    <EditRecipeForm
      formFields={formFields}
      recipeData={recipeData}
      tags={tags || []}
      user={user}
    />
  ) : (
    // render the create recipe form if the recipe data is not available
    <CreateRecipeForm formFields={formFields} tags={tags || []} user={user} />
  );
}
