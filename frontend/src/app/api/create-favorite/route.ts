import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*
  @return array|Response
  @desc Creates a favorite for the current user
*/

export async function POST(request: NextRequest) {
  // check if the request method is POST
  if (request.method !== "POST") {
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
  const { recipeId } = body;

  if (!recipeId) {
    return NextResponse.json(
      { message: "Recipe ID is required" },
      { status: 400 },
    );
  }

  // now we try to create the favorite
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipes/${recipeId}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    const data = await response.json();

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status },
      );
    }

    // if the response is ok from the server, we can return the data
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    // log the error
    console.error("Favorite creation failed: ", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Favorite creation failed" },
      { status: 500 },
    );
  }
}
