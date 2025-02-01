import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status },
      );
    }

    revalidatePath("/my-recipes");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${data.recipe.id}`);
    revalidatePath(`/recipes/edit/${data.recipe.id}`);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Recipe creation failed: ", error);
    return NextResponse.json(
      { message: "Recipe creation failed" },
      { status: 500 },
    );
  }
}
