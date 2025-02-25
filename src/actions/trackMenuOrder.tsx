"use server";

import { fetchData } from "@/utils/fetchData";

export async function trackMenuOrder(
  id: string,
  from: string,
  to: string
): Promise<string | void> {
  try {
    await fetchData("http://localhost:8081/track", {
      method: "POST",
      body: JSON.stringify({ id, from, to }),
    });
    return `Dragged to Id :${to}`;
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}
