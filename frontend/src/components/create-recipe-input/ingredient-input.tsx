// components/IngredientInput.tsx
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Cross from "@/assets/icons/cross.svg";
import { Control, FieldValues, Path } from "react-hook-form";
import { Button, ButtonSize } from "../button/button";

interface IngredientInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  ingredients: string[];
  updateIngredient: (index: number, value: string) => void;
  removeIngredient: (index: number) => void;
  addIngredient: () => void;
}

export function IngredientInput<T extends FieldValues>({
  control,
  name,
  ingredients,
  updateIngredient,
  removeIngredient,
  addIngredient,
}: IngredientInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Zutaten</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => {
                      updateIngredient(index, e.target.value);
                      field.onChange(ingredients.filter(Boolean).join(", "));
                    }}
                  />
                  <Cross
                    className="m-2 w-6 cursor-pointer stroke-sfblack stroke-2"
                    onClick={() => {
                      removeIngredient(index);
                      field.onChange(ingredients.filter(Boolean).join(", "));
                    }}
                    data-testid="cross-icon"
                  />
                </div>
              ))}
              <Button
                type="button"
                size={ButtonSize.SMALL}
                label="+ Zutat hinzufügen"
                onClick={() => {
                  addIngredient();
                  field.onChange(ingredients.filter(Boolean).join(", "));
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
