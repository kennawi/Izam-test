"use server";

import { Menu } from "@/types/menuTypes";
import { fetchData } from "@/utils/fetchData";

export async function saveMenuOrder(
  newListOrderItem: Menu[]
): Promise<{ success: boolean; message: string } | string | void> {
  const url = process.env.API_URL + "/nav";

  if (!url) {
    console.error("❌ API URL is not defined.");
    return "Configuration error: API URL is missing.";
  }

  try {
    await fetchData(url, {
      method: "POST",
      body: JSON.stringify(newListOrderItem),
    });

    return { success: true, message: "✅ Menu order saved successfully." };
  } catch (error) {
    console.error("❌ Failed to save menu order:", error);
    return `❌ Error: ${
      error instanceof Error ? error.message : "Unknown error occurred."
    }`;
  }
}
