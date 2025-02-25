"use server";

import { Menu } from "@/types/menuTypes";
import { fetchData } from "@/utils/fetchData";

export async function saveMenuOrder(
  newListOrderItem: Menu[]
): Promise<string | void> {
  try {
    await fetchData("http://localhost:8081/nav", {
      method: "POST",
      body: JSON.stringify(newListOrderItem),
    });

    return `saved successfully`;
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}
