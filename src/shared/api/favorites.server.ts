import { ItemType } from "@/shared/api/types";

export const getFavoritesServer = async (token?: Promise<string | null>) => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favorites`,
    {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch favorites");
  }

  const data = await res.json();

  return data.map((item: ItemType) => item.recipe.id);
};