import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// here we need to defined it as a NextRequest, so taht we can access the request body
export async function PATCH(request: NextRequest) {
  console.log("PATCH request received");

  if (request.method !== "PATCH") {
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

  // now we try to communicate with the backend
  try {
    // get the session to retrieve the user's accessToken
    const session = await getServerSession(authConfig);

    // if there is no session, return unauthorized
    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // send the request to the backend
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/uploads/${imageId}?type=recipe&recipe_id=${recipeId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      },
    );

    const data = await response.text();

    console.log("data: ", data);

    // (optional) handle errors
    // if the response from the server is not ok, in some cases the response of the
    // next.js server can be a 200, if you're not conditionally checking if the
    // !response.ok,
    // that's why we did an additional check here
    if (!response.ok) {
      return NextResponse.json({ message: data }, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Image update failed: ", error);
    return NextResponse.json(
      { message: "Error updating image" },
      { status: 400 },
    );
  }
}
