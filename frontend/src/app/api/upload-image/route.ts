import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*
  @desc Uploads an image to the backend
*/

export async function POST(request: NextRequest) {
  // check if the request method is POST
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // retrieve the request body
  const formData = await request.formData();

  // retrieve the form data
  const recipeId = formData.get("recipe_id");
  const userId = formData.get("user_id");
  const type = formData.get("type");

  // if there is no type, return a bad request error
  if (!type) {
    return NextResponse.json(
      { message: "Upload type is required" },
      { status: 400 },
    );
  }

  // if the type is recipe and there is no recipeId, return a bad request error
  if (type === "recipe" && !recipeId) {
    return NextResponse.json(
      { message: "Recipe ID is required for recipe image uploads" },
      { status: 400 },
    );
  }

  // if the type is profile and there is no userId, return a bad request error
  if (type === "profile" && !userId) {
    return NextResponse.json(
      { message: "User ID is required for profile image uploads" },
      { status: 400 },
    );
  }

  // try to upload the image
  try {
    // get the session to retrieve the user's accessTok en
    const session = await getServerSession(authConfig);

    // if there is no session, return unauthorized
    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // set the base url
    const baseUrl = `${process.env.BACKEND_URL}/api/uploads`;

    // set the query params
    const queryParams =
      type === "recipe"
        ? `type=recipe&recipe_id=${recipeId}`
        : `type=profile&user_id=${userId}`;

    // set the upload url
    const uploadUrl = `${baseUrl}?${queryParams}`;

    // send the request to the backend
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    // retrieve the data
    const data = await response.text();

    // if the response is not ok from the server, we can handle the error
    if (!response.ok) {
      return NextResponse.json({ message: data }, { status: response.status });
    }

    // return the data
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    // log the error
    console.error("Image upload failed: ", error);

    // return a 400 error
    return NextResponse.json(
      { message: "There was an error in the upload." },
      { status: 500 },
    );
  }
}
