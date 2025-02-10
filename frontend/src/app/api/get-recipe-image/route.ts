import { NextRequest, NextResponse } from "next/server";

/*
  @desc Retrieves the recipe image by its ID
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

  // if there is no recipeId, return a bad request error
  if (!recipeId) {
    return NextResponse.json(
      { message: "Recipe ID ist erforderlich" },
      { status: 400 },
    );
  }

  try {
    // set the url
    const url = `${process.env.BACKEND_URL}/api/images?type=recipe&recipe_id=${recipeId}`;

    // retrieve the recipe image
    const response = await fetch(url);
    const data = await response.json();

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden des Rezeptbildes" },
        { status: response.status },
      );
    }

    // if the response is ok from the server, we can return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Fehler beim Laden des Rezeptbildes:", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Fehler beim Laden des Rezeptbildes" },
      { status: 500 },
    );
  }
}
