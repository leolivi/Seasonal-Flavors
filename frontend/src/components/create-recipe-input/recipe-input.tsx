import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as RHFFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { LuInfo } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

interface FormField {
  name: string;
  label: string;
  type?: string;
  tooltip?: string;
}

interface RecipeInputProps<T extends FieldValues> {
  fields: FormField[];
  control: Control<T>;
  layout?: "row" | "column";
  onFileChange?: (fieldName: string, file: File | null) => void;
}

export function RecipeInput<T extends FieldValues>({
  fields,
  control,
  layout = "column",
  onFileChange,
}: RecipeInputProps<T>) {
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

  const clearFileInput = (
    fieldName: string,
    controllerField: { onChange: (value: File | null) => void },
  ) => {
    if (previewUrls[fieldName]) {
      URL.revokeObjectURL(previewUrls[fieldName]);
    }
    setPreviewUrls((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
    controllerField.onChange(null);

    const fileInput = document.querySelector(
      `input[name="${fieldName}"]`,
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div
      data-testid="create-recipe-form"
      className={
        layout === "row" ? "flex flex-row items-start gap-4" : "space-y-6"
      }
    >
      {fields.map((field) => (
        <RHFFormField
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
                <div className="flex items-center">
                  {field.label}
                  {field.tooltip && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={(e) => e.preventDefault()}
                            className="ml-2"
                            tabIndex={-1}
                            aria-label={`Info: ${field.tooltip}`}
                          >
                            <LuInfo className="cursor-pointer text-sfblack transition-all hover:text-sfred" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{field.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </FormLabel>
              <FormControl>
                {field.type === "file" ? (
                  <div className="flex flex-col items-center">
                    <div className="flex w-full items-center space-x-2">
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
                        className="w-full"
                      />
                      {(previewUrls[field.name] || controllerField.value) && (
                        <RxCross2
                          size={25}
                          className="m-2 w-6 cursor-pointer text-sfred"
                          onClick={() =>
                            clearFileInput(field.name, controllerField)
                          }
                          aria-label="Clear file input"
                          data-testid="cross-button"
                        />
                      )}
                    </div>
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
                    min="0"
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
