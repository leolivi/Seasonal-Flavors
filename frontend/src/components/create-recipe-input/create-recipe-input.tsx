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
import { useState } from "react";
import Image from "next/image";
import { EditRecipeSchema } from "@/validation/editRecipeSchema";

interface CreateRecipeInputProps {
  fields: {
    name: keyof CreateRecipeSchema;
    label: string;
    type?: string;
  }[];
  control: Control<EditRecipeSchema>;
  layout?: "row" | "column";
  onFileChange?: (fieldName: keyof EditRecipeSchema, file: File | null) => void;
}

export function CreateRecipeInput({
  fields,
  control,
  layout = "column",
  onFileChange,
}: CreateRecipeInputProps) {
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  const handleFileChange = (
    fieldName: keyof CreateRecipeSchema,
    file: File | null,
  ) => {
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
      className={layout === "row" ? "flex flex-row gap-4" : "space-y-6"}
      data-testid="create-recipe-form"
    >
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={control}
          name={field.name}
          render={({ field: controllerField }) => (
            <FormItem
              className={layout === "row" ? "flex-1" : ""}
              data-testid={`form-item-${field.name}`}
            >
              <FormLabel
                className="font-figtreeRegular"
                htmlFor={field.name}
                data-testid={`form-label-${field.name}`}
              >
                {field.label}
              </FormLabel>
              <FormControl>
                {field.type === "file" ? (
                  <div
                    className="flex flex-col items-center"
                    data-testid={`file-upload-container-${field.name}`}
                  >
                    <Input
                      id={field.name}
                      type="file"
                      accept="image/*"
                      data-testid={`file-input-${field.name}`}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileChange(field.name, file);
                        controllerField.onChange(file);
                      }}
                      onBlur={controllerField.onBlur}
                      name={controllerField.name}
                      ref={controllerField.ref}
                    />
                    {previewUrls[field.name] && (
                      <div
                        className="mt-2"
                        data-testid={`image-preview-${field.name}`}
                      >
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
                    data-testid={`input-${field.name}`}
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
              <FormMessage data-testid={`form-message-${field.name}`} />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
