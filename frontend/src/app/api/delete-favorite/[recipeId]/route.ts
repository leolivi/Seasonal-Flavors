import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*
  @return array|Response
  @desc Deletes a favorite for the current user
*/

export async function DELETE(
  request: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  // check if the request method is DELETE
  if (request.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // retrieve the recipeId from the params
  const recipeId = params.recipeId;

  // get the session to retrieve the user's accessToken
  const session = await getServerSession(authConfig);

  // if there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // try to delete the favorite
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipes/${recipeId}/favorite`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { message: error || "Fehler beim Löschen des Favoriten" },
        { status: response.status },
      );
    }

    // if the response is ok from the server, we can return the data
    return NextResponse.json(
      { message: "Favorit erfolgreich gelöscht" },
      { status: 200 },
    );
  } catch (error) {
    // log the error
    console.error("Favorite deletion failed: ", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Error deleting favorite" },
      { status: 500 },
    );
  }
}
