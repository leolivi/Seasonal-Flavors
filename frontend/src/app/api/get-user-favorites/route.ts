import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const authHeader = request.headers.get("authorization");

    if (!userId || !authHeader) {
      return NextResponse.json(
        { message: "User ID und Authorization sind erforderlich" },
        { status: 400 },
      );
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/user/${userId}/favorites`,
      {
        headers: {
          Authorization: authHeader,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden der Favoriten" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fehler beim Laden der Favoriten:", error);
    return NextResponse.json(
      { message: "Fehler beim Laden der Favoriten" },
      { status: 500 },
    );
  }
}
