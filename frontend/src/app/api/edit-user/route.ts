import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  // Überprüfe die Methode
  if (request.method !== "PATCH") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const userId = body.id;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is missing in the request body" },
        { status: 400 },
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        cache: "no-store",
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

    // Direkt nach dem Update die aktuellen Benutzerdaten abrufen
    const updatedUserResponse = await fetch(
      `${process.env.BACKEND_URL}/api/user`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      },
    );

    if (!updatedUserResponse.ok) {
      return NextResponse.json(
        { message: "Failed to fetch updated user data" },
        { status: updatedUserResponse.status },
      );
    }

    const updatedUserData = await updatedUserResponse.json();

    revalidatePath("/profile");

    return NextResponse.json(updatedUserData, { status: 200 });
  } catch (error) {
    console.error("User edit failed:", error);
    return NextResponse.json({ message: "User edit failed" }, { status: 500 });
  }
}
