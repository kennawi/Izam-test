import { Menu } from "@/types/menuTypes";
import { fetchData } from "./fetchData";

export default async function getNavItems() {
  const url = process.env.NEXT_PUBLIC_API_URL + "/nav";
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  const itemData: Menu[] = await fetchData(url);

  return itemData;
}
