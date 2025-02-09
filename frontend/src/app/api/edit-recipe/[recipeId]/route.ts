import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/*
  @return array|Response
  @desc Edits a recipe for the current user
*/

export async function PATCH(
  request: NextRequest,
  { params }: { params: { recipeId: string } },
) {
  // check if the request method is PATCH
  if (request.method !== "PATCH") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // retrieve the recipeId from the params
  const recipeId = params.recipeId;

  // get the session to retrieve the user's accessToken
  const session = await getServerSession(authConfig);

  // if there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // retrieve the request body
  const body = await request.json();

  // try to edit the recipe
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

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      const error = await response.json();
      console.error("Recipe edit failed:", error);
      return NextResponse.json(
        { message: error.message },
        { status: response.status },
      );
    }

    // revalidate the paths
    revalidatePath("/my-recipes");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${recipeId}`);
    revalidatePath(`/recipes/edit/${recipeId}`);

    // return the data
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // log the error
    console.error("Recipe edit failed:", error);
    // return a 500 error
    return NextResponse.json(
      { message: "Recipe edit failed" },
      { status: 500 },
    );
  }
}
