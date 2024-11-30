export async function dataPatchWithToken(
  endpoint: string,
  payload: unknown,
  token: string,
) {
  try {
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to patch data");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
