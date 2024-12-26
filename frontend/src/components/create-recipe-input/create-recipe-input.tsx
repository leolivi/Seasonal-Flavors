import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

interface FormField {
  name: string;
  label: string;
  type?: string;
}

interface CreateRecipeInputProps<T extends FieldValues> {
  fields: FormField[];
  control: Control<T>;
  layout?: "row" | "column";
  onFileChange?: (fieldName: string, file: File | null) => void;
}

export function CreateRecipeInput<T extends FieldValues>({
  fields,
  control,
  layout = "column",
  onFileChange,
}: CreateRecipeInputProps<T>) {
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  const handleFileChange = (fieldName: string, file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [fieldName]: url }));
    } else {
      setPreviewUrls((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
    if (onFileChange) onFileChange(fieldName, file);
  };

  return (
    <div
      data-testid="create-recipe-form"
      className={layout === "row" ? "flex flex-row gap-4" : "space-y-6"}
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={field.name as Path<T>}
          render={({ field: controllerField }) => (
            <FormItem
              className={layout === "row" ? "flex-1" : ""}
              data-testid={`form-item-${field.name}`}
            >
              <FormLabel
                htmlFor={field.name}
                data-testid={`form-label-${field.name}`}
              >
                {field.label}
              </FormLabel>
              <FormControl>
                {field.type === "file" ? (
                  <div className="flex flex-col items-center">
                    <Input
                      id={field.name}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileChange(field.name, file);
                        controllerField.onChange(file);
                      }}
                      onBlur={controllerField.onBlur}
                      name={controllerField.name}
                      data-testid={`input-${field.name}`}
                      ref={controllerField.ref}
                    />
                    {previewUrls[field.name] && (
                      <div className="mt-2">
                        <Image
                          src={previewUrls[field.name]}
                          alt={`Preview of ${field.label}`}
                          width={200}
                          height={200}
                          className="rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>
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
                    data-testid={`input-${field.name}`}
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
