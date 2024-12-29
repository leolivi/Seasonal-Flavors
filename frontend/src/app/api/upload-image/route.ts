import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// here we need to defined it as a NextRequest, so taht we can access the request body
export async function POST(request: NextRequest) {
  // route schützen
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  // retrieve the request body
  const formData = await request.formData();

  const recipeId = formData.get("recipe_id");
  const userId = formData.get("user_id");
  const type = formData.get("type");

  if (!type) {
    return NextResponse.json(
      { message: "Upload type is required" },
      { status: 400 },
    );
  }

  if (type === "recipe" && !recipeId) {
    return NextResponse.json(
      { message: "Recipe ID is required for recipe image uploads" },
      { status: 400 },
    );
  }

  if (type === "profile" && !userId) {
    return NextResponse.json(
      { message: "User ID is required for profile image uploads" },
      { status: 400 },
    );
  }

  // now we try to communicate with the backend
  try {
    // get the session to retrieve the user's accessToken
    const session = await getServerSession(authConfig);

    // if there is no session, return unauthorized
    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Konstruiere die URL basierend auf dem Upload-Typ
    const baseUrl = `${process.env.BACKEND_URL}/api/uploads`;
    const queryParams =
      type === "recipe"
        ? `type=recipe&recipe_id=${recipeId}`
        : `type=profile&user_id=${userId}`;

    const uploadUrl = `${baseUrl}?${queryParams}`;

    // send the request to the backend
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    const data = await response.text();

    // (optional) handle errors
    // if the response from the server is not ok, in some cases the response of the
    // next.js server can be a 200, if you're not conditionally checking if the
    // !response.ok,
    // that's why we did an additional check here
    if (!response.ok) {
      return NextResponse.json({ message: data }, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Image upload failed: ", error);
    return NextResponse.json(
      { message: "There was an error in the upload." },
      { status: 400 },
    );
  }
}
