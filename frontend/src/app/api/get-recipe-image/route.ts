import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const recipeId = searchParams.get("recipe_id");

  if (!recipeId) {
    return NextResponse.json(
      { message: "Recipe ID ist erforderlich" },
      { status: 400 },
    );
  }

  try {
    const url = `${process.env.BACKEND_URL}/api/images?type=recipe&recipe_id=${recipeId}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden des Rezeptbildes" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fehler beim Laden des Rezeptbildes:", error);
    return NextResponse.json(
      { message: "Fehler beim Laden des Rezeptbildes" },
      { status: 500 },
    );
  }
}
