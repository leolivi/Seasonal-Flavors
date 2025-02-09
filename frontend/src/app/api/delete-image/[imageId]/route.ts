import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*
  @return array|Response
  @desc Deletes an image for the current user
*/

export async function DELETE(
  request: NextRequest,
  { params }: { params: { imageId: string } },
) {
  // check if the request method is DELETE
  if (request.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // retrieve the imageId from the params
  const imageId = params.imageId;

  // retrieve the request body
  const body = await request.json();
  const entityId = body.entity_id;

  // if the entityId or imageId is not provided, return a 400 error
  if (!entityId || !imageId) {
    return NextResponse.json(
      { message: "Entity ID and Image ID are required" },
      { status: 400 },
    );
  }

  // get the session to retrieve the user's accessToken
  const session = await getServerSession(authConfig);

  // if there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // try to delete the image
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/uploads/${imageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          entity_id: entityId,
        }),
      },
    );

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { message: error || "Fehler beim Löschen des Bildes" },
        { status: response.status },
      );
    }

    // if the response is ok from the server, we can return the data
    return NextResponse.json(
      { message: "Bild erfolgreich gelöscht" },
      { status: 200 },
    );
  } catch (error) {
    // log the error
    console.error("Error deleting image:", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Error deleting image" },
      { status: 500 },
    );
  }
}
