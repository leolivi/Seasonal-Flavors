import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { CreateRecipeSchema } from "@/validation/createRecipeSchema";

interface CreateRecipeInputProps {
  fields: {
    name: keyof CreateRecipeSchema;
    label: string;
    placeholder: string;
    type?: string;
  }[];
  control: Control<CreateRecipeSchema>;
  layout?: "row" | "column";
}

export function CreateRecipeInput({
  fields,
  control,
  layout = "column",
}: CreateRecipeInputProps) {
  return (
    <div className={layout === "row" ? "flex flex-row gap-4" : "space-y-6"}>
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={field.name}
          render={({ field: controllerField }) => (
            <FormItem className={layout === "row" ? "flex-1" : ""}>
              <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  {...controllerField}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
