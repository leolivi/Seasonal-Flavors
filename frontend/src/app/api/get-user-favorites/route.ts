import { NextRequest, NextResponse } from "next/server";

/*
  @desc Retrieves the user's favorites
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
    const userId = searchParams.get("user_id");
    const authHeader = request.headers.get("authorization");

    // if there is no userId or authHeader, return a bad request error
    if (!userId || !authHeader) {
      return NextResponse.json(
        { message: "User ID und Authorization sind erforderlich" },
        { status: 400 },
      );
    }

    // set the url
    const url = `${process.env.BACKEND_URL}/api/user/${userId}/favorites`;

    // retrieve the favorites
    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
      },
    });

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden der Favoriten" },
        { status: response.status },
      );
    }

    // retrieve the favorites
    const data = await response.json();

    // return the favorites
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Fehler beim Laden der Favoriten:", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Fehler beim Laden der Favoriten" },
      { status: 500 },
    );
  }
}
