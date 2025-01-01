import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, email, password, password_confirmation } = body;

    if (!token || !email || !password || !password_confirmation) {
      return NextResponse.json(
        { message: "Alle Felder sind erforderlich" },
        { status: 400 },
      );
    }

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

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Password reset failed:", error);
    return NextResponse.json(
      { message: "Password reset failed" },
      { status: 500 },
    );
  }
}
