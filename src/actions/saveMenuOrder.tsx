"use server";

import { Menu } from "@/types/menuTypes";
import { fetchData } from "@/utils/fetchData";

export async function saveMenuOrder(
  newListOrderItem: Menu[]
): Promise<string | void> {
  const url = process.env.API_URL + "/nav" || "/api/nav";
  try {
    await fetchData(url, {
      method: "POST",
      body: JSON.stringify(newListOrderItem),
    });

    return `saved successfully`;
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}
