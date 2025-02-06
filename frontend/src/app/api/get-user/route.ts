import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const authHeader = request.headers.get("authorization");

    let url = `${process.env.BACKEND_URL}/api/user`;

    if (userId) {
      url = `${process.env.BACKEND_URL}/api/user/${userId}`;
    }

    const headers: HeadersInit = {};
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { message: error || "Fehler beim Einsehen des Users" },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.file_path && !data.file_path.startsWith("http")) {
      data.file_path = `${process.env.BACKEND_URL}/${data.file_path}`;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting user: ", error);
    return NextResponse.json(
      { message: "Error getting user" },
      { status: 500 },
    );
  }
}
