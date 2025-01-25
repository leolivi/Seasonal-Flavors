import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID ist erforderlich" },
      { status: 400 },
    );
  }

  try {
    const session = await getServerSession(authConfig);
    if (!session?.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = `${process.env.BACKEND_URL}/api/images?type=profile&user_id=${userId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden des Profilbildes" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fehler beim Laden des Profilbildes:", error);
    return NextResponse.json(
      { message: "Fehler beim Laden des Profilbildes" },
      { status: 500 },
    );
  }
}
