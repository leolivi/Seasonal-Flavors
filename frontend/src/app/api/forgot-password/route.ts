import { NextRequest, NextResponse } from "next/server";

/*
  @desc Sends a password reset email to the user
*/

export async function POST(request: NextRequest) {
  // check if the request method is POST
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // retrieve the request body
  const body = await request.json();
  const { email } = body;

  // if there is no email, return a bad request error
  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  // try to send the password reset email
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      const error = await response.json();
      console.error("Password edit failed:", error);
      return NextResponse.json(
        { message: error.message },
        { status: response.status },
      );
    }

    // return the data
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Password reset request failed:", error);
    // return a 500 error
    return NextResponse.json(
      { message: "Password reset request failed" },
      { status: 500 },
    );
  }
}
