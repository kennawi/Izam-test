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
      let errorMessage = `Failed to fetch data: ${response.status}`;

      if (response.status === 400) {
        errorMessage = "Bad Request: Invalid input.";
      } else if (response.status === 500) {
        errorMessage = "Server Error: Please try again later.";
      }

      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    // Handle empty response
    const text = await response.text();
    if (!text) {
      console.warn("Received empty response");
      return {} as T; // Return an empty object instead of parsing
    }
    // Ensure response is valid JSON
    try {
      const jsonData = JSON.parse(text);
      return jsonData as T;
    } catch (parseError) {
      console.error("❌ JSON parse error:", parseError);
      throw new Error("Invalid JSON response from server.");
    }
  } catch (error) {
    console.error("❌ Fetch error:", error);
    throw new Error("Network error: Failed to connect to the server.");
  }
}
