import { z } from "zod";
import { createRecipeSchema } from "./createRecipeSchema";

/*
  @desc Schema for editing a recipe extending the createRecipeSchema
*/
export const editRecipeSchema = createRecipeSchema
  .omit({ cover_image: true })
  .extend({
    cooking_time: z.preprocess(
      (val) => (val === "" ? null : Number(val)),
      createRecipeSchema.shape.cooking_time,
    ),
    prep_time: z.preprocess(
      (val) => (val === "" ? null : Number(val)),
      createRecipeSchema.shape.prep_time,
    ),
    servings: z.preprocess(
      (val) => (val === "" ? null : Number(val)),
      createRecipeSchema.shape.servings,
    ),
    steps: createRecipeSchema.shape.steps,
    ingredients: createRecipeSchema.shape.ingredients,
    cover_image: createRecipeSchema.shape.cover_image.optional(),
  });

export type EditRecipeSchema = z.infer<typeof editRecipeSchema>;
