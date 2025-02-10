import { NextRequest, NextResponse } from "next/server";

/*
  @desc Retrieves the season tags
*/

export async function GET(request: NextRequest) {
  // check if the request method is GET
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    // retrieve the search params
    const { searchParams } = new URL(request.url);
    const recipeId = searchParams.get("recipe_id");

    // set the appropriate URL based on whether we're fetching recipe tags or all tags
    const url = recipeId
      ? `${process.env.BACKEND_URL}/api/recipes/${recipeId}/tags`
      : `${process.env.BACKEND_URL}/api/tags`;

    const response = await fetch(url);

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden der Tags" },
        { status: response.status },
      );
    }

    // retrieve the tags
    const data = await response.json();

    // return the tags
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Fehler beim Laden der Tags:", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Fehler beim Laden der Tags" },
      { status: 500 },
    );
  }
}
