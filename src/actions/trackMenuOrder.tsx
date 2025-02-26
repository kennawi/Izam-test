"use server";

import { fetchData } from "@/utils/fetchData";

export async function trackMenuOrder(
  id: string,
  from: string,
  to: string
): Promise<string | void> {
  const url = process.env.API_URL + "/track" || "/api/track";
  try {
    await fetchData(url, {
      method: "POST",
      body: JSON.stringify({ id, from, to }),
    });
    return `Dragged to Id :${to}`;
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}
