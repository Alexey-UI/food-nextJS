import {axiosInstance} from "@/lib/axiosInstance";
import {ItemType} from "@/shared/api/types";


export const getFavorites = async (token?: Promise<string | null> | string) => {
  const { data } = await axiosInstance.get("/favorites", {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  return data.map((item: ItemType) => {
    return item.recipe.id
  });
};

export const addFavorite = async (recipeId: number, token?: string) => {
  await axiosInstance.post(
    "/favorites/add",
    { recipe: recipeId },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }
  );
};

export const removeFavorite = async (recipeId: number, token?: string) => {
  await axiosInstance.post(
    "/favorites/remove",
    { recipe: recipeId },
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }
  );
};