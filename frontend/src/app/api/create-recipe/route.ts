import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/*
  @return array|Response
  @desc Creates a recipe for the current user
*/

export async function POST(request: NextRequest) {
  // check if the request method is POST
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // get the session to retrieve the user's accessToken
  const session = await getServerSession(authConfig);

  // if there is no session, return unauthorized
  if (!session || !session.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // retrieve the request body
  const body = await request.json();

  // try to create the recipe
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

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status },
      );
    }

    // if the response is ok from the server, we can return the data
    revalidatePath("/my-recipes");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${data.recipe.id}`);
    revalidatePath(`/recipes/edit/${data.recipe.id}`);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    // log the error
    console.error("Recipe creation failed: ", error);

    // return a 500 error
    return NextResponse.json(
      { message: "Recipe creation failed" },
      { status: 500 },
    );
  }
}
