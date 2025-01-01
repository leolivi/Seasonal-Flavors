import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    // Überprüfen Sie zuerst, ob die E-Mail existiert
    // const userCheckResponse = await fetch(
    //   `${process.env.BACKEND_URL}/api/users/check-email`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   },
    // );

    // if (!userCheckResponse.ok) {
    //   return NextResponse.json(
    //     { message: "Diese E-Mail-Adresse existiert nicht" },
    //     { status: 404 },
    //   );
    // }

    // Wenn die E-Mail existiert, senden Sie die Passwort-Reset-Anfrage
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

    if (!response.ok) {
      const error = await response.json();
      console.error("Password edit failed:", error);
      return NextResponse.json(
        { message: error.message },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Password reset request failed:", error);
    return NextResponse.json(
      { message: "Password reset request failed" },
      { status: 500 },
    );
  }
}
