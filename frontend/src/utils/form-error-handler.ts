interface ErrorHandlerOptions {
  form?: any;
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void;
  defaultErrorTitle?: string;
  defaultErrorMessage?: string;
}

/*
  @desc handle form errors
*/
export function handleFormErrors(errors: any, options: ErrorHandlerOptions) {
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
        form.setError(error.field, {
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
        form.setError(field, {
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
