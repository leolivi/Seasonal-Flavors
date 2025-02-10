import { NextRequest, NextResponse } from "next/server";

/*
  @desc Retrieves a user by its ID
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

    // set the url
    let url = `${process.env.BACKEND_URL}/api/user`;

    if (userId) {
      url = `${process.env.BACKEND_URL}/api/user/${userId}`;
    }

    // set the headers
    const headers: HeadersInit = {};
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // retrieve the user
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { message: error || "Fehler beim Einsehen des Users" },
        { status: response.status },
      );
    }

    // retrieve the data
    const data = await response.json();

    // if the data has a file_path and it does not start with http, we can set the file_path
    if (data.file_path && !data.file_path.startsWith("http")) {
      data.file_path = `${process.env.BACKEND_URL}/${data.file_path}`;
    }

    // return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Error getting user: ", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Error getting user" },
      { status: 500 },
    );
  }
}
