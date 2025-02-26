"use server";

import { fetchData } from "@/utils/fetchData";

export async function trackMenuOrder(
  id: string,
  from: string,
  to: string
): Promise<{ success: boolean; message: string } | string | void> {
  const url = process.env.API_URL + "/track";
  try {
    await fetchData(url, {
      method: "POST",
      body: JSON.stringify({ id, from, to }),
    });
    return {
      success: true,
      message: `✅ Successfully moved item to ID: ${to}`,
    };
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}
