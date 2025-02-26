import { Menu } from "@/types/menuTypes";
import { fetchData } from "./fetchData";

export default async function getNavItems() {
  const url = process.env.API_URL + "/nav";
  const itemData: Menu[] = await fetchData(url);

  return itemData;
}
