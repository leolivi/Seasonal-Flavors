import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  const recipeId = params.recipeId;

  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipe/${recipeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { message: error || "Fehler beim Löschen des Rezepts" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { data, message: "Rezept erfolgreich gelöscht" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Recipe deletion failed: ", error);
    return NextResponse.json(
      { message: "Error deleting recipe" },
      { status: 500 },
    );
  }
}
