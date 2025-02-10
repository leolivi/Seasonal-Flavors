import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*
  @desc Retrieves the profile image of a user
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
  const userId = searchParams.get("user_id");

  // if there is no userId, return a bad request error
  if (!userId) {
    return NextResponse.json(
      { message: "User ID ist erforderlich" },
      { status: 400 },
    );
  }

  // try to retrieve the profile image
  try {
    // get the session to retrieve the user's accessToken
    const session = await getServerSession(authConfig);
    // if there is no session, return unauthorized
    if (!session?.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // set the url
    const url = `${process.env.BACKEND_URL}/api/images?type=profile&user_id=${userId}`;

    // retrieve the profile image
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // retrieve the data
    const data = await response.json();

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden des Profilbildes" },
        { status: response.status },
      );
    }

    // if the data is an array and has a length, we can set the file_path
    if (Array.isArray(data) && data.length > 0) {
      data[0].file_path = data[0].file_path.startsWith("http")
        ? data[0].file_path
        : `${process.env.BACKEND_URL}/${data[0].file_path}`;
    }

    // return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Fehler beim Laden des Profilbildes:", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Fehler beim Laden des Profilbildes" },
      { status: 500 },
    );
  }
}
