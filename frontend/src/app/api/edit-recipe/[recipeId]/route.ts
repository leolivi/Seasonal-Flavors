import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  const recipeId = params.recipeId;

  // Session abrufen
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Body auslesen
  const body = await request.json();

  // Anfrage an das Backend senden
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/recipe/${recipeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Recipe edit failed:", error);
      return NextResponse.json(
        { message: error.message },
        { status: response.status },
      );
    }

    revalidatePath("/my-recipes");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${recipeId}`);
    revalidatePath(`/recipes/edit/${recipeId}`);

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Recipe edit failed:", error);
    return NextResponse.json(
      { message: "Recipe edit failed" },
      { status: 500 },
    );
  }
}
