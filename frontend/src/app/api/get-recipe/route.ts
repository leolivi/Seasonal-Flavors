import { NextRequest, NextResponse } from "next/server";

/*
  @desc Retrieves a recipe by its ID
*/

// TODO: chef if i need this...
export const dynamic = "force-dynamic";

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

  // try to retrieve the recipe
  try {
    // set the url
    const url = `${process.env.BACKEND_URL}/api/recipe?`;
    const params = new URLSearchParams();

    // retrieve the id
    const id = searchParams.get("id");
    if (id) {
      params.append("id", id);
    }

    // retrieve the userId
    const userId = searchParams.get("user_id");
    if (userId) {
      params.append("user_id", userId);
    }

    // retrieve the season
    const season = searchParams.get("season");
    if (season) {
      params.append("tags[]", "all_year");
      params.append("tags[]", season);
    }

    // retrieve the title
    const title = searchParams.get("title");
    if (title) {
      params.append("title", title);
    }

    // retrieve the limit
    const limit = searchParams.get("limit");
    if (limit) {
      params.append("limit", limit);
    }

    // retrieve the recipe
    const response = await fetch(`${url}${params.toString()}`);
    const data = await response.json();

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden der Rezepte" },
        { status: response.status },
      );
    }

    // if the response is ok from the server, we can return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Fehler beim Laden der Rezepte:", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Fehler beim Laden der Rezepte" },
      { status: 500 },
    );
  }
}
