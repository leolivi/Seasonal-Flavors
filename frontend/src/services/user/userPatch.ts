import { UserData } from "@/types/interfaces";

interface HandleUserPatchParams {
  data: Partial<Pick<UserData, "id" | "username" | "email">>;
  userData: UserData;
}

interface UserPatchError {
  field: string;
  message: string;
}

interface UserPatchResponse {
  success?: boolean;
  status: number;
  errors?: UserPatchError[] | { [key: string]: string } | string;
}

/*
  @desc Handle user patch
*/
export const handleUserPatch = async ({
  data,
  userData,
}: HandleUserPatchParams): Promise<UserPatchResponse> => {
  if (!userData) {
    return {
      status: 400,
      errors: [{ field: "general", message: "Benutzerdaten nicht verfügbar" }],
    };
  }

  // redirect to api handler edit-user
  try {
    const response = await fetch("/api/edit-user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // get the response data
    const responseData = await response.json();

    // return the response data
    return {
      ...responseData,
      status: response.status,
      success: response.ok,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      errors: [
        {
          field: "general",
          message: "Ein unerwarteter Fehler ist aufgetreten",
        },
      ],
    };
  }
};
