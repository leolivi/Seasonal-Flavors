import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*
  @return array|Response
  @desc Retrieves an image for a recipe or user profile
*/

export async function GET(request: NextRequest) {
  // check if the request method is GET
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // retrieve the search params
  const { searchParams } = new URL(request.url);
  const recipeId = searchParams.get("recipe_id");
  const userId = searchParams.get("user_id");
  const type = searchParams.get("type");

  // if there is no type, return a bad request error
  if (!type) {
    return NextResponse.json(
      { message: "Bildtyp ist erforderlich" },
      { status: 400 },
    );
  }

  // try to retrieve the image
  try {
    let url = `${process.env.BACKEND_URL}/api/images`;
    let headers = {};

    if (type === "profile") {
      // get the session to retrieve the user's accessToken
      const session = await getServerSession(authConfig);
      // if there is no session, return unauthorized
      if (!session?.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      // retrieve the image
      url = `${process.env.BACKEND_URL}/api/images?type=${type}&user_id=${userId}`;
      // set the headers
      headers = {
        Authorization: `Bearer ${session.accessToken}`,
      };
    } else if (type === "recipe") {
      // retrieve the image
      url = `${process.env.BACKEND_URL}/api/images?type=${type}&recipe_id=${recipeId}`;
    }

    const response = await fetch(url, { headers });
    const data = await response.json();

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden des Bildes" },
        { status: response.status },
      );
    }

    // return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Fehler beim Laden des Bildes:", error);
    // return a 500 error
    return NextResponse.json(
      { message: "Fehler beim Laden des Bildes" },
      { status: 500 },
    );
  }
}
