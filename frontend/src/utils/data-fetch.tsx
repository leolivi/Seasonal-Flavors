export async function dataFetch(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function dataFetchWithToken(endpoint: string, token: string) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
