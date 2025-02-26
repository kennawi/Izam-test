export async function fetchData<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch data: ${response.status}`);
    }
    // Handle empty response
    const text = await response.text();
    if (!text) {
      console.warn("Received empty response");
      return {} as T; // Return an empty object instead of parsing
    }

    const data = JSON.parse(text);
    // console.log("Fetched data:", data);
    return data as Promise<T>;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
