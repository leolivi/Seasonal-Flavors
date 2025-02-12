import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField as RHFFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LuInfo } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useState } from "react";
import Image from "next/image";

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

/*
  @desc Displays the input fields for the create recipe form and edit recipe form
*/
export function RecipeInput<T extends FieldValues>({
  fields,
  control,
  layout = "column",
  onFileChange,
}: RecipeInputProps<T>) {
  // set the preview image urls
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  // handle the file change
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

  // clear the file input
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

  // render the recipe input
  return (
    <div
      data-testid="create-recipe-form"
      className={
        layout === "row" ? "flex flex-row items-start gap-4" : "space-y-6"
      }
    >
      {/* map the fields */}
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
                className={
                  layout === "row"
                    ? "max-[460px]:line-clamp-2 max-[460px]:h-8"
                    : ""
                }
              >
                <div className="flex items-center">
                  {field.label}

                  {/* tooltip */}
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
                {/* file input type file */}
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

                      {/* clear image preview button */}
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

                    {/* image preview */}
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
                  /* input type text */
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

              {/* form message */}
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
