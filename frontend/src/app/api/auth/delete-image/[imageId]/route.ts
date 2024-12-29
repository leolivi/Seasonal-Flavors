import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { imageId: string } },
) {
  const imageId = params.imageId;

  const body = await request.json();
  const entityId = body.entity_id;

  if (!entityId || !imageId) {
    return NextResponse.json(
      { message: "Entity ID and Image ID are required" },
      { status: 400 },
    );
  }

  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/uploads/${imageId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          entity_id: entityId,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json(
        { message: error || "Fehler beim Löschen des Bildes" },
        { status: response.status },
      );
    }

    return NextResponse.json({ message: "Bild erfolgreich gelöscht" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Error deleting image" },
      { status: 400 },
    );
  }
}
