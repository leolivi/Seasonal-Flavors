import { Button, ButtonSize } from "../button/button";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";

interface IngredientInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: string;
}

/*
  @desc Displays the ingredient input
*/
export function IngredientInput<T extends FieldValues>({
  control,
  name,
  defaultValue,
}: IngredientInputProps<T>) {
  // set ingredients state
  const [ingredients, setIngredients] = useState<string[]>(
    defaultValue ? defaultValue.split(",").map((i) => i.trim()) : [""],
  );

  // update ingredient
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // remove ingredient
  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  // add ingredient
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  // render the ingredient input
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem data-testid="ingredient-form-item">
          {/* label */}
          <FormLabel data-testid="ingredient-label">Zutaten</FormLabel>

          <FormControl>
            <div className="space-y-2" data-testid="ingredients-container">
              {/* map ingredients */}
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2"
                  data-testid={`ingredient-row-${index}`}
                >
                  <Input
                    value={ingredient}
                    onChange={(e) => {
                      updateIngredient(index, e.target.value);
                      field.onChange(ingredients.filter(Boolean).join(", "));
                    }}
                    data-testid={`ingredient-input-${index}`}
                    aria-label={`Zutat ${index + 1}`}
                  />
                  {ingredients.length > 1 && (
                    <RxCross2
                      size={25}
                      className="m-2 w-6 cursor-pointer text-sfred"
                      onClick={() => {
                        removeIngredient(index);
                        field.onChange(ingredients.filter(Boolean).join(", "));
                      }}
                      data-testid={`remove-ingredient-${index}`}
                    />
                  )}
                </div>
              ))}

              {/* add ingredient button */}
              <Button
                type="button"
                size={ButtonSize.SMALL}
                label="+ Zutat hinzufügen"
                onClick={() => {
                  addIngredient();
                  field.onChange(ingredients.filter(Boolean).join(", "));
                }}
                data-testid="add-ingredient-button"
              />
            </div>
          </FormControl>

          {/* form message */}
          <FormMessage data-testid="ingredient-form-message" />
        </FormItem>
      )}
    />
  );
}
