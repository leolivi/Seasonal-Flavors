async function dataFetch(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export default dataFetch;
