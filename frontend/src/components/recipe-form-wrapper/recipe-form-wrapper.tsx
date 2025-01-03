import { CreateRecipeSchema } from "@/validation/createRecipeSchema";
import CreateRecipeForm from "../forms/create-recipe-form";
import EditRecipeForm from "../forms/edit-recipe-form";
import { ImageData } from "@/services/image/imageService";
import { UserData } from "@/services/user/userService";
import { Recipe } from "@/services/recipe/recipeService";

type FormFieldName = keyof CreateRecipeSchema;

export interface FormField {
  name: FormFieldName;
  label: string;
  placeholder?: string;
  type?: string;
}

interface RecipeFormWrapperProps {
  recipeData?: Recipe;
  tags: { id: number; name: string }[];
  user: UserData;
  imageData?: ImageData;
}

export default function RecipeFormWrapper({
  recipeData,
  tags,
  user,
  imageData,
}: RecipeFormWrapperProps) {
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
      user={user}
      imageData={imageData}
    />
  ) : (
    <CreateRecipeForm formFields={formFields} tags={tags || []} user={user} />
  );
}
