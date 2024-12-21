import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  console.log("DELETE request received");

  if (request.method !== "DELETE") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  const formData = await request.formData();
  console.log("FormData received:", Object.fromEntries(formData));

  const recipeId = formData.get("recipe_id");
  const imageId = formData.get("image_id");

  console.log("IDs from request:", { recipeId, imageId });

  if (!recipeId || !imageId) {
    return NextResponse.json(
      { message: "Recipe ID and Image ID are required" },
      { status: 400 },
    );
  }

  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/uploads/${imageId}?type=recipe&recipe_id=${recipeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      },
    );

    const data = await response.text();

    console.log("data: ", data);

    if (!response.ok) {
      return NextResponse.json({ message: data }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Image deletion failed: ", error);
    return NextResponse.json(
      { message: "Error deleting image" },
      { status: 400 },
    );
  }
}
