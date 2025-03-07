import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/*
  @desc Edits the current user
*/

export async function PATCH(request: NextRequest) {
  // check if the request method is PATCH
  if (request.method !== "PATCH") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // get the session to retrieve the user's accessToken
  const session = await getServerSession(authConfig);

  // if there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // retrieve the request body
  const body = await request.json();
  const userId = body.id;

  // if there is no userId, return a bad request error
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing in the request body" },
      { status: 400 },
    );
  }

  // try to edit the user
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        cache: "no-store",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // convert the error message to the expected format
      if (errorData.message) {
        // extract the field from the error message
        let field = "general";
        if (errorData.message.includes("email")) {
          field = "email";
        } else if (errorData.message.includes("username")) {
          field = "username";
        }

        return NextResponse.json(
          {
            errors: [
              {
                field: field,
                message: errorData.message,
              },
            ],
          },
          { status: response.status },
        );
      }
    }

    // retrieve the updated user data
    const updatedUserResponse = await fetch(
      `${process.env.BACKEND_URL}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      },
    );

    // if the response is not ok from the server, we can handle the error
    if (!updatedUserResponse.ok) {
      return NextResponse.json(
        { message: "Failed to fetch updated user data" },
        { status: updatedUserResponse.status },
      );
    }

    const updatedUserData = await updatedUserResponse.json();

    // revalidate the paths
    revalidatePath("/profile");

    // return the data
    return NextResponse.json(updatedUserData, { status: 200 });
  } catch (error) {
    console.error("User edit failed:", error);
    return NextResponse.json(
      {
        errors: [
          {
            field: "general",
            message: "Ein unerwarteter Fehler ist aufgetreten",
          },
        ],
      },
      { status: 500 },
    );
  }
}
