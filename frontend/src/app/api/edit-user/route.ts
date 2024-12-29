import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  // Überprüfe die Methode
  if (request.method !== "PATCH") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // Session abrufen
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Body auslesen
  const body = await request.json();

  // Sicherstellen, dass die User-ID vorhanden ist
  const userId = body.id;
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing in the request body" },
      { status: 400 },
    );
  }

  // Anfrage an das Backend senden
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("User edit failed:", error);
      return NextResponse.json(
        { message: error.message },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("User edit failed:", error);
    return NextResponse.json({ message: "User edit failed" }, { status: 500 });
  }
}
