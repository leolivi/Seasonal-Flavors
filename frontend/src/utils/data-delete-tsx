export async function dataDeleteWithToken(endpoint: string, token: string) {
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete data");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
}
