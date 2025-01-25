import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const recipeId = searchParams.get("recipe_id");
  const userId = searchParams.get("user_id");
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json(
      { message: "Bildtyp ist erforderlich" },
      { status: 400 },
    );
  }

  try {
    let url = `${process.env.BACKEND_URL}/api/images`;
    let headers = {};

    if (type === "profile") {
      const session = await getServerSession(authConfig);
      if (!session?.accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      url = `${process.env.BACKEND_URL}/api/images?type=${type}&user_id=${userId}`;
      headers = {
        Authorization: `Bearer ${session.accessToken}`,
      };
    } else if (type === "recipe") {
      url = `${process.env.BACKEND_URL}/api/images?type=${type}&recipe_id=${recipeId}`;
    }

    console.log("Backend URL:", url);

    const response = await fetch(url, { headers });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden des Bildes" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fehler beim Laden des Bildes:", error);
    return NextResponse.json(
      { message: "Fehler beim Laden des Bildes" },
      { status: 500 },
    );
  }
}
