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
    type?: string;
  }[];
  control: Control<CreateRecipeSchema>;
  layout?: "row" | "column";
  onFileChange?: (
    fieldName: keyof CreateRecipeSchema,
    file: File | null,
  ) => void;
}

export function CreateRecipeInput({
  fields,
  control,
  layout = "column",
  onFileChange,
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
                {field.type === "file" ? (
                  <Input
                    id={field.name}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (onFileChange) onFileChange(field.name, file);
                      controllerField.onChange(file);
                    }}
                    onBlur={controllerField.onBlur}
                    name={controllerField.name}
                    ref={controllerField.ref}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type || "text"}
                    value={
                      typeof controllerField.value === "string" ||
                      typeof controllerField.value === "number"
                        ? controllerField.value
                        : ""
                    }
                    onChange={(e) => {
                      const value =
                        e.target.type === "number"
                          ? e.target.value === ""
                            ? ""
                            : Number(e.target.value)
                          : e.target.value;
                      controllerField.onChange(value);
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
