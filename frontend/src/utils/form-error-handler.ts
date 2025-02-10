import { Path, UseFormReturn } from "react-hook-form";

interface ErrorHandlerOptions<
  TFormData extends Record<string, unknown> = Record<string, unknown>,
> {
  form?: UseFormReturn<TFormData>;
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void;
  defaultErrorTitle?: string;
  defaultErrorMessage?: string;
}

export interface ValidationError {
  type: string;
  [key: string]: unknown;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export type ApiErrors = ApiFieldError[] | Record<string, string> | string;

/*
  @desc handle form errors
*/
export function handleFormErrors<
  TFormData extends Record<string, unknown> = Record<string, unknown>,
>(
  errors: ValidationError | ApiErrors,
  options: ErrorHandlerOptions<TFormData>,
) {
  const {
    form,
    toast,
    defaultErrorTitle = "Fehler",
    defaultErrorMessage = "Ein Fehler ist aufgetreten.",
  } = options;

  // handle react hook form validation errors
  if (errors && errors instanceof Object && "type" in errors) {
    toast({
      variant: "destructive",
      title: "Validierungsfehler",
      description: "Bitte überprüfe die Eingabefelder auf Fehler.",
    });
    return;
  }

  // handle api errors as array
  if (Array.isArray(errors)) {
    errors.forEach((error) => {
      if (form) {
        form.setError(error.field as Path<TFormData>, {
          type: "manual",
          message: error.message,
        });
      }
    });
    return;
  }

  // handle api errors as object
  if (typeof errors === "object" && errors !== null) {
    Object.entries(errors).forEach(([field, message]) => {
      if (form) {
        form.setError(field as Path<TFormData>, {
          type: "manual",
          message: message as string,
        });
      }
    });
    return;
  }

  // handle string errors
  if (typeof errors === "string") {
    toast({
      variant: "destructive",
      title: defaultErrorTitle,
      description: errors || defaultErrorMessage,
    });
    return;
  }

  // fallback for unknown errors
  toast({
    variant: "destructive",
    title: defaultErrorTitle,
    description: defaultErrorMessage,
  });
}
