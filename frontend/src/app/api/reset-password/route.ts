import { NextRequest, NextResponse } from "next/server";

/*
  @desc Resets the password of a user
*/

export async function POST(request: NextRequest) {
  // check if the request method is POST
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    // retrieve the body
    const body = await request.json();
    const { token, email, password, password_confirmation } = body;

    // if there is no token, email, password or password_confirmation, return a bad request error
    if (!token || !email || !password || !password_confirmation) {
      return NextResponse.json(
        { message: "Alle Felder sind erforderlich" },
        { status: 400 },
      );
    }

    // reset the password
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, password, password_confirmation }),
      },
    );

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message },
        { status: response.status },
      );
    }

    // retrieve the data
    const data = await response.json();

    // return the data
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Password reset failed:", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Password reset failed" },
      { status: 500 },
    );
  }
}
