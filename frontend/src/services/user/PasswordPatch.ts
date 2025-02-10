/*
  @desc Handle forgot password
*/
export const handleForgotPassword = async ({
  data,
  toast,
}: {
  data: { email: string };
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void;
}) => {
  // redirect to api handler forgot-password
  try {
    const payload = {
      email: data.email,
    };

    const response = await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Email konnte nicht gesendet werden.",
      });
      const error = await response.json();
      console.error("Fehler beim Senden der Email:", error);
      return;
    }

    const responseData = await response.json();
    const recipeId = responseData.recipe?.id;

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Die Email wurde erfolgreich gesendet.",
    });

    return recipeId;
  } catch (error) {
    console.error("Fehler beim Senden der Email:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description:
        "Email konnte nicht gesendet werden. Bitte erneut versuchen.",
    });
  }
};

export const handleResetPassword = async ({
  data,
  toast,
  router,
}: {
  data: {
    password: string;
    token: string;
  };
  toast: (options: {
    variant: "default" | "destructive";
    title: string;
    description: string;
  }) => void;
  router: { push: (path: string) => void };
}) => {
  try {
    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Passwort konnte nicht zurückgesetzt werden.",
      });
      return;
    }

    toast({
      variant: "default",
      title: "Erfolgreich!",
      description: "Das Passwort wurde erfolgreich zurückgesetzt.",
    });

    router.push("/session");
  } catch (error) {
    console.error("Fehler beim Zurücksetzen des Passworts:", error);
    toast({
      variant: "destructive",
      title: "Fehler",
      description:
        "Passwort konnte nicht zurückgesetzt werden. Bitte erneut versuchen.",
    });
  }
};
