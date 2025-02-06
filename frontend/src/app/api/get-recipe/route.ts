import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const url = `${process.env.BACKEND_URL}/api/recipe?`;
    const params = new URLSearchParams();

    // ID Parameter für einzelnes Rezept
    const id = searchParams.get("id");
    if (id) {
      params.append("id", id);
    }

    // User ID Parameter
    const userId = searchParams.get("user_id");
    if (userId) {
      params.append("user_id", userId);
    }

    // Saisonale und gefilterte Rezepte Parameter
    const season = searchParams.get("season");
    if (season) {
      params.append("tags[]", "all_year");
      params.append("tags[]", season);
    }

    // Titel Parameter für die Filterung
    const title = searchParams.get("title");
    if (title) {
      params.append("title", title);
    }

    // Limit Parameter für saisonale Rezepte
    const limit = searchParams.get("limit");
    if (limit) {
      params.append("limit", limit);
    }

    const response = await fetch(`${url}${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: "Fehler beim Laden der Rezepte" },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Fehler beim Laden der Rezepte:", error);
    return NextResponse.json(
      { message: "Fehler beim Laden der Rezepte" },
      { status: 500 },
    );
  }
}
